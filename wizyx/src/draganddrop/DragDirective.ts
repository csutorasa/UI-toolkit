import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { DragAndDropService, DragStartEventContext, DragEventContext } from './DragAndDropService';

@Directive({
    selector: '[wx-draggable]',
})
export class DragDirective {
    @Input('wx-draggable') public draggable: boolean;
    @Input('wx-drag-data') public dragData: any;
    @Output('wx-drag-start') public onStart: EventEmitter<DragStartEventContext> = new EventEmitter();
    @Output('wx-drag-success') public onSuccess: EventEmitter<DragEventContext> = new EventEmitter();
    @Output('wx-drag-fail') public onFail: EventEmitter<DragEventContext> = new EventEmitter();

    private static readonly DRAG_CLASS: string = 'wx-draggable';

    constructor(protected element: ElementRef, protected dragAndDropService: DragAndDropService) {
        const nativeElement = <HTMLScriptElement>element.nativeElement;
        nativeElement.classList.add(DragDirective.DRAG_CLASS);
        nativeElement.addEventListener('mousedown', (event: DragEvent) => {
            if (event.button === 0 && this.draggable) {
                dragAndDropService.registerDragEvent(nativeElement, event, this.dragData,
                    context => this.onDragStart(context),
                    context => this.onDragSuccess(context), context => this.onDragFail(context));
            }
        });
    }
    
    protected onDragStart(context: DragStartEventContext) {
        this.onStart.emit(context);
    }

    protected onDragSuccess(context: DragEventContext) {
        this.onSuccess.emit(context);
    }

    protected onDragFail(context: DragEventContext) {
        this.onFail.emit(context);
    }
}