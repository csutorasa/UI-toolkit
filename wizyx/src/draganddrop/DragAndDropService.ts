import { Injectable } from '@angular/core';
import { Utils, Coordinates } from '../utils/Utils';

export interface DragStartEventContext {
    dragData: any;
    dragElement: HTMLScriptElement;
}

export interface DragEventContext extends DragStartEventContext {
    dropData: any;
    dropElement: HTMLScriptElement;
}

export interface DragEndData {
    dropElement: HTMLScriptElement;
    getDropData: () => any;
    canDrag: (context: DragEventContext) => boolean;
    dragStart: (context: DragStartEventContext) => any,
    dropSuccess: (context: DragEventContext) => any;
    dropFail: (context: DragEventContext) => any;
}

@Injectable()
export class DragAndDropService {

    public static readonly DRAGGING_CLASS: string = 'wx-dragging';
    public static readonly DROP_CLASS: string = 'wx-drop';
    public static readonly DRAG_MOUSE_CLASS: string = 'wx-dragmouse';
    private static readonly DRAG_OVER_CLASS: string = 'wx-drag-over';
    private static readonly CAN_DROP_CLASS: string = 'wx-can-drop';
    private static readonly CANNOT_DROP_CLASS: string = 'wx-cannot-drop';
    protected readonly dropZones: DragEndData[] = [];

    protected id: number = 0;

    /**
     * Starts a new wizyx drag event.
     * @param nativeElement element that is dragged
     * @param event native JavaScript event of the click
     * @param dragData data from the drag-side
     * @param dragStart onStart event handler drag-side
     * @param dragSuccess onSuccess event handler drag-side
     * @param dragFail onFail event handler drag-side
     */
    public registerDragEvent(nativeElement: HTMLScriptElement, event: MouseEvent, dragData: any,
        dragStart: (context: DragStartEventContext) => any,
        dragSuccess: (context: DragEventContext) => any, dragFail: (context: DragEventContext) => any): void {
        const offset = { x: event.offsetX, y: event.offsetY };
        const startContext: DragStartEventContext = {
            dragData: dragData,
            dragElement: nativeElement
        };
        let startCoords: Coordinates = undefined;
        let objectUnder: HTMLScriptElement = undefined;
        const mouseEventHandler: (event: MouseEvent) => any = (event: MouseEvent) => {
            if (!startCoords) {
                startCoords = Utils.getPageCoordinates(nativeElement);
                startCoords.x += offset.x;
                startCoords.y += offset.y;
            }
            nativeElement.style.transform = 'translate(' + (event.pageX - startCoords.x) + 'px, ' + (event.pageY - startCoords.y) + 'px)';
            const dropZone = this.findDropZone(nativeElement, event);
            objectUnder = this.setDragOver(dragData, nativeElement, objectUnder, dropZone);
        };
        const dragEndHandler: (event: MouseEvent) => any = (event: MouseEvent) => {
            nativeElement.style.transform = '';
            nativeElement.classList.remove(DragAndDropService.DRAGGING_CLASS);
            document.body.classList.remove(DragAndDropService.DRAG_MOUSE_CLASS);
            document.removeEventListener('mousemove', mouseEventHandler);
            document.removeEventListener('mouseup', dragEndHandler);
            objectUnder = this.setDragOver(dragData, nativeElement, objectUnder, undefined);
            this.dropZones.forEach(dz => {
                dz.dropElement.classList.remove(DragAndDropService.CAN_DROP_CLASS);
                dz.dropElement.classList.remove(DragAndDropService.CANNOT_DROP_CLASS);
            })
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
        document.body.classList.add(DragAndDropService.DRAG_MOUSE_CLASS);
        document.addEventListener('mousemove', mouseEventHandler);
        document.addEventListener('mouseup', dragEndHandler);
        dragStart(startContext);
        this.dropZones.forEach(dz => this.processDragStartOnZones(dz, startContext));
        // Clear selection not to trigger element.dragstart event
        Utils.clearSelection();
    }

    /**
     * Registers a new drop zone to the registry.
     * @param nativeElement element of the zone
     * @param getDropData callback to return drop-side data
     * @param canDrag callback to decide if event is successful
     * @param dropSuccess onSuccess event handler
     * @param dropFail onFail event handler
     */
    public registerDropZone(nativeElement: HTMLScriptElement, getDropData: () => any, canDrag: (context: DragEventContext) => boolean,
        dragStart: (context: DragStartEventContext) => any,
        dropSuccess: (context: DragEventContext) => any, dropFail: (context: DragEventContext) => any): void {
        this.dropZones.push({
            canDrag: canDrag,
            getDropData: getDropData,
            dropElement: nativeElement,
            dragStart: dragStart,
            dropSuccess: dropSuccess,
            dropFail: dropFail
        });
    }

    protected findDropZone(dragElement: HTMLScriptElement, event: MouseEvent): DragEndData {
        dragElement.style.visibility = 'hidden';
        const targetElement: Element = document.elementFromPoint(event.clientX, event.clientY);
        dragElement.style.visibility = '';
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

    protected setDragOver(dragData: any, dragElement: HTMLScriptElement, before: HTMLScriptElement, dropZone: DragEndData): HTMLScriptElement {
        if (dropZone) {
            if (before !== dropZone.dropElement) {
                const context: DragEventContext = {
                    dragData: dragData,
                    dragElement: dragElement,
                    dropData: dropZone.getDropData(),
                    dropElement: dropZone.dropElement
                };
                if (before) {
                    before.classList.remove(DragAndDropService.DRAG_OVER_CLASS);
                }
                dropZone.dropElement.classList.add(DragAndDropService.DRAG_OVER_CLASS);
                return dropZone.dropElement;
            }
        } else {
            if (before) {
                before.classList.remove(DragAndDropService.DRAG_OVER_CLASS);
                return undefined;
            }
        }
        return before;
    }

    protected processDragStartOnZones(dropZone: DragEndData, startContext: DragStartEventContext) {
        dropZone.dragStart(startContext);
        const testContext: DragEventContext = {
            dragData: startContext.dragData,
            dragElement: startContext.dragElement,
            dropData: dropZone.getDropData(),
            dropElement: dropZone.dropElement
        }
        if(dropZone.canDrag(testContext)) {
            dropZone.dropElement.classList.add(DragAndDropService.CAN_DROP_CLASS);
        } else {
            dropZone.dropElement.classList.add(DragAndDropService.CANNOT_DROP_CLASS);
        }
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
