import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { DragAndDropService, DragEventContext } from './DragAndDropService';

@Directive({
    selector: '[ui-drag]',
})
export class DragDirective {
    @Input('ui-drag-data') public dragData: any;
    @Output('ui-drag') public onDragged: EventEmitter<DragEventContext> = new EventEmitter();

    private static readonly DRAG_CLASS: string = 'ui-draggable';

    constructor(protected element: ElementRef, protected dragAndDropService: DragAndDropService) {
        const nativeElement = <HTMLScriptElement>element.nativeElement;
        nativeElement.classList.add(DragDirective.DRAG_CLASS);
        nativeElement.addEventListener('mousedown', (event: DragEvent) => {
            if(event.button === 0) {
                dragAndDropService.registerDragEvent(nativeElement, event, this.dragData, context => this.onDragFinish(context));
            }
        });
    }

    protected onDragFinish(context: DragEventContext) {
        this.onDragged.emit(context);
    }
}