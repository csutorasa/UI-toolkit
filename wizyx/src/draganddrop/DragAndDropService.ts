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
    dragEnd: (context: DragEventContext) => any;
}

@Injectable()
export class DragAndDropService {

    public static readonly DRAGGING_CLASS = 'ui-dragging';
    public static readonly DROP_CLASS: string = 'ui-drop';
    private static readonly CAN_DROP_CLASS: string = 'ui-can-drop';
    private static readonly CANNOT_DROP_CLASS: string = 'ui-cannot-drop';
    protected readonly dropZones: DragEndData[] = [];

    protected id: number = 0;

    public registerDragEvent(nativeElement: HTMLScriptElement, event: MouseEvent, dragData: any, dragStart: (context: DragEventContext) => any): void {
        let startCoords;
        const offset = { x: event.offsetX, y: event. offsetY };
        let objectUnder: HTMLScriptElement;
        const mouseEventHandler: (event: MouseEvent) => any = (event: MouseEvent) => {
            if(!startCoords) {
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
            if(dropZone) {
                const context: DragEventContext = {
                    dragData: dragData,
                    dragElement: nativeElement,
                    dropData: dropZone.getDropData(),
                    dropElement: dropZone.dropElement
                };
                this.processDragEvent(context, dragStart, dropZone.dragEnd, dropZone.canDrag);
            }
        }

        nativeElement.style.transform = '';
        nativeElement.classList.add(DragAndDropService.DRAGGING_CLASS);
        document.addEventListener('mousemove', mouseEventHandler);
        document.addEventListener('mouseup', dragEndHandler);
    }

    public registerDropZone(nativeElement: HTMLScriptElement, getDropData: () => any,
        canDrag: (context: DragEventContext) => boolean, dragEnd: (context: DragEventContext) => any) {
        this.dropZones.push({
            canDrag: canDrag,
            getDropData: getDropData,
            dropElement: nativeElement,
            dragEnd: dragEnd
        });
    }

    protected findDropZone(dragElement: HTMLScriptElement, event: MouseEvent): DragEndData {
        dragElement.style.visibility = 'hidden';
        const targetElement: Element = document.elementFromPoint(event.clientX, event.clientY);
        dragElement.style.visibility = 'visible';
        return this.findDropZoneRecursive(<Element>targetElement);
    }

    protected findDropZoneRecursive(targetElement: Element): DragEndData {
        if(targetElement) {
            if(targetElement.classList.contains(DragAndDropService.DROP_CLASS)) {
                return this.dropZones.find(dz => dz.dropElement === targetElement);
            } else {
                return this.findDropZoneRecursive(targetElement.parentElement);
            }
        }
        return undefined;
    }

    protected colorize(dragData: any, dragElement: HTMLScriptElement, before: HTMLScriptElement, dropZone: DragEndData): HTMLScriptElement {
        if(dropZone) {
            if(before !== dropZone.dropElement) {
                if(before) {
                    before.style.backgroundColor = '';
                }
                before = dropZone.dropElement;
                const context: DragEventContext = {
                    dragData: dragData,
                    dragElement: dragElement,
                    dropData: dropZone.getDropData(),
                    dropElement: dropZone.dropElement
                };
                if(dropZone.canDrag(context)) {
                    before.style.backgroundColor = '#9ef442';
                }
            }
        } else {
            if(before) {
                before.style.backgroundColor = '';
                before = undefined;
            }
        }
        return before;
    }
    
    protected processDragEvent(context: DragEventContext, dragStart: (context: DragEventContext) => any,
        dragEnd: (context: DragEventContext) => any, canDrag: (context: DragEventContext) => boolean): boolean {
        if(canDrag && canDrag(context)) {
            if(dragStart) {
                dragStart(context);
            }
            if(dragEnd) {
                dragEnd(context);
            }
            return true;
        }
        return false;
    }
}
