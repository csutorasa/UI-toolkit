import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { DragAndDropService, DragEventContext } from './DragAndDropService';

@Directive({
    selector: '[ui-drop]',
})
export class DropDirective {
    @Input('ui-candrop') public canDropFunction: (dragData: DragEventContext) => boolean;
    @Input('ui-drop-data') public dropData: any;
    @Output('ui-drop') public readonly onDrop: EventEmitter<DragEventContext> = new EventEmitter();

    constructor(protected element: ElementRef, protected dragAndDropService: DragAndDropService) {
        const nativeElement = <HTMLScriptElement>element.nativeElement;
        nativeElement.classList.add(DragAndDropService.DROP_CLASS);
        dragAndDropService.registerDropZone(nativeElement, () => this.dropData, context => this.canDrop(context), context => this.drop(context));
    }
    
    protected canDrop(context: DragEventContext): boolean {
        return this.canDropFunction(context);
    }

    protected drop(context: DragEventContext): void {
        this.onDrop.emit(context);
    }
}