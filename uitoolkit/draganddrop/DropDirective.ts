import { Directive, ElementRef, Output, EventEmitter } from '@angular/core';

@Directive({
	selector: '[uidrop]',
})
export class DragAndDropDirective {
    @Output('uidrop') onDrop: EventEmitter<DataTransfer> = new EventEmitter();

	constructor(protected element: ElementRef) {
        (<HTMLScriptElement>element.nativeElement).ondragover = this.allowDragAndDrop;
        (<HTMLScriptElement>element.nativeElement).ondrop = (event) => this.drop(event);
	}

    allowDragAndDrop(event: DragEvent) {
        event.preventDefault();
    }
    
    drop(event: DragEvent) {
        event.preventDefault();
        this.onDrop.emit(event.dataTransfer);
    }
}