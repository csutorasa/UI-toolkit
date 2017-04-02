import { Directive, ElementRef, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[uidrop]',
})
export class DragAndDropDirective {
    @Output('uidrop') protected onDrop: EventEmitter<DataTransfer> = new EventEmitter();

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