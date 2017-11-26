import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { DragAndDropService, DragEventContext, DragStartEventContext } from './DragAndDropService';

@Directive({
    selector: '[wx-accept-drop]',
})
export class DropDirective {
    @Input('wx-accept-drop') public canDropFunction: (dragData: DragEventContext) => boolean;
    @Input('wx-drop-data') public dropData: any;
    @Output('wx-drag-start') public readonly onStart: EventEmitter<DragStartEventContext> = new EventEmitter();
    @Output('wx-drop-end') public readonly onEnd: EventEmitter<DragStartEventContext> = new EventEmitter();
    @Output('wx-drop-success') public readonly onSuccess: EventEmitter<DragEventContext> = new EventEmitter();
    @Output('wx-drop-fail') public readonly onFail: EventEmitter<DragEventContext> = new EventEmitter();

    constructor(protected element: ElementRef, protected dragAndDropService: DragAndDropService) {
        const nativeElement = <HTMLScriptElement>element.nativeElement;
        nativeElement.classList.add(DragAndDropService.DROP_CLASS);
        dragAndDropService.registerDropZone(nativeElement, () => this.dropData, context => this.canDrop(context),
            context => this.dragStart(context), context => this.dragEnd(context),
            context => this.dropSuccess(context), context => this.dropFail(context));
    }

    protected canDrop(context: DragEventContext): boolean {
        return this.canDropFunction && this.canDropFunction(context);
    }
    
    protected dragStart(context: DragStartEventContext): void {
        this.onStart.emit(context);
    }
    
    protected dragEnd(context: DragStartEventContext): void {
        this.onEnd.emit(context);
    }

    protected dropSuccess(context: DragEventContext): void {
        this.onSuccess.emit(context);
    }

    protected dropFail(context: DragEventContext): void {
        this.onFail.emit(context);
    }
}