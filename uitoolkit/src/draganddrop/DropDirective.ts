import { Directive, ElementRef, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[ui-drop]',
})
export class DragAndDropDirective {
    @Output('ui-drop') public readonly onDrop: EventEmitter<DataTransfer> = new EventEmitter();

    constructor(protected element: ElementRef) {
        (<HTMLScriptElement>element.nativeElement).ondragover = this.allowDragAndDrop;
        (<HTMLScriptElement>element.nativeElement).ondrop = (event) => this.drop(event);
    }

    protected allowDragAndDrop(event: DragEvent): void {
        event.preventDefault();
    }

    protected drop(event: DragEvent): void {
        event.preventDefault();
        this.onDrop.emit(event.dataTransfer);
    }
}