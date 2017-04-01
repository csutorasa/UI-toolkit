import { Component } from '@angular/core';

@Component({
	selector: 'draganddrop-test',
	template: `
    <div class="drop-zone" (uidrop)="drop($event)"></div>
	<p>{{text}}</p>`,
})
export class DragAndDropTestComponent {
	text: string;

	drop(transfer: DataTransfer) {
		const textValue = transfer.getData('text');
		if(textValue) {
			this.text = textValue;
		} else if(transfer.files.length > 0) {
			this.text = '';
			for(let i = 0; i < transfer.files.length; i++) {
				this.text += transfer.files[i].name + ', ';
			}
		}
	}
}