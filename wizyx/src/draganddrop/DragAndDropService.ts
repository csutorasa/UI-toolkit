import { Injectable } from '@angular/core';
import { Utils } from '../utils/Utils';

export interface DragEventContext {
    dragData: any;
    dragElement: HTMLScriptElement;
    dropData: any;
    dropElement: HTMLScriptElement;
}

export interface DragEndData {
    dropElement: HTMLScriptElement;
    getDropData: () => any;
    canDrag: (context: DragEventContext) => boolean;
    dropSuccess: (context: DragEventContext) => any;
    dropFail: (context: DragEventContext) => any;
}

@Injectable()
export class DragAndDropService {

    public static readonly DRAGGING_CLASS = 'wx-dragging';
    public static readonly DROP_CLASS: string = 'wx-drop';
    private static readonly CAN_DROP_CLASS: string = 'wx-can-drop';
    private static readonly CANNOT_DROP_CLASS: string = 'wx-cannot-drop';
    protected readonly dropZones: DragEndData[] = [];

    protected id: number = 0;

    public registerDragEvent(nativeElement: HTMLScriptElement, event: MouseEvent, dragData: any,
        dragSuccess: (context: DragEventContext) => any, dragFail: (context: DragEventContext) => any): void {
        let startCoords;
        const offset = { x: event.offsetX, y: event.offsetY };
        let objectUnder: HTMLScriptElement;
        const mouseEventHandler: (event: MouseEvent) => any = (event: MouseEvent) => {
            if (!startCoords) {
                startCoords = Utils.getPageCoordinates(nativeElement);
                startCoords.x += offset.x;
                startCoords.y += offset.y;
            }
            nativeElement.style.transform = 'translate(' + (event.pageX - startCoords.x) + 'px, ' + (event.pageY - startCoords.y) + 'px)';
            const dropZone = this.findDropZone(nativeElement, event);
            objectUnder = this.colorize(dragData, nativeElement, objectUnder, dropZone);
        };
        const dragEndHandler: (event: MouseEvent) => any = (event: MouseEvent) => {
            nativeElement.style.transform = '';
            nativeElement.classList.remove(DragAndDropService.DRAGGING_CLASS);
            document.removeEventListener('mousemove', mouseEventHandler);
            document.removeEventListener('mouseup', dragEndHandler);
            objectUnder = this.colorize(dragData, nativeElement, objectUnder, undefined);
            const dropZone = this.findDropZone(nativeElement, event);
            if (dropZone) {
                const context: DragEventContext = {
                    dragData: dragData,
                    dragElement: nativeElement,
                    dropData: dropZone.getDropData(),
                    dropElement: dropZone.dropElement
                };
                this.processDragEvent(context, dropZone.canDrag, dragSuccess, dragFail, dropZone.dropSuccess, dropZone.dropFail);
            }
        }

        nativeElement.style.transform = '';
        nativeElement.classList.add(DragAndDropService.DRAGGING_CLASS);
        document.addEventListener('mousemove', mouseEventHandler);
        document.addEventListener('mouseup', dragEndHandler);
        // Clear selection not to trigger element.dragstart event
        if (window.getSelection) {
            if (window.getSelection().empty) {  // Chrome
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {  // Firefox
                window.getSelection().removeAllRanges();
            }
        } else if ((<any>document).selection) {  // IE?
            (<any>document).selection.empty();
        }
    }

    public registerDropZone(nativeElement: HTMLScriptElement, getDropData: () => any, canDrag: (context: DragEventContext) => boolean,
        dropSuccess: (context: DragEventContext) => any, dropFail: (context: DragEventContext) => any): void {
        this.dropZones.push({
            canDrag: canDrag,
            getDropData: getDropData,
            dropElement: nativeElement,
            dropSuccess: dropSuccess,
            dropFail: dropFail
        });
    }

    protected findDropZone(dragElement: HTMLScriptElement, event: MouseEvent): DragEndData {
        dragElement.style.visibility = 'hidden';
        const targetElement: Element = document.elementFromPoint(event.clientX, event.clientY);
        dragElement.style.visibility = 'visible';
        return this.findDropZoneRecursive(<Element>targetElement);
    }

    protected findDropZoneRecursive(targetElement: Element): DragEndData {
        if (targetElement) {
            if (targetElement.classList.contains(DragAndDropService.DROP_CLASS)) {
                return this.dropZones.find(dz => dz.dropElement === targetElement);
            } else {
                return this.findDropZoneRecursive(targetElement.parentElement);
            }
        }
        return undefined;
    }

    protected colorize(dragData: any, dragElement: HTMLScriptElement, before: HTMLScriptElement, dropZone: DragEndData): HTMLScriptElement {
        if (dropZone) {
            if (before !== dropZone.dropElement) {
                if (before) {
                    before.style.backgroundColor = '';
                }
                before = dropZone.dropElement;
                const context: DragEventContext = {
                    dragData: dragData,
                    dragElement: dragElement,
                    dropData: dropZone.getDropData(),
                    dropElement: dropZone.dropElement
                };
                if (dropZone.canDrag(context)) {
                    before.style.backgroundColor = '#9ef442';
                }
            }
        } else {
            if (before) {
                before.style.backgroundColor = '';
                before = undefined;
            }
        }
        return before;
    }

    protected processDragEvent(context: DragEventContext, canDrag: (context: DragEventContext) => boolean,
        dragSuccess: (context: DragEventContext) => any, dragFail: (context: DragEventContext) => any,
        dropSuccess: (context: DragEventContext) => any, dropFail: (context: DragEventContext) => any): boolean {
        if (canDrag && canDrag(context)) {
            dragSuccess(context);
            dropSuccess(context);
            return true;
        } else {
            dragFail(context);
            dropFail(context);
            return false;
        }
    }
}
