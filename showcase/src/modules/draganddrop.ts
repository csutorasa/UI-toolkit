import { Component } from '@angular/core';
import { Utils } from 'uitoolkit';
import { CreateTesterComponentData } from '../source';

@Component(CreateTesterComponentData('draganddrop'))
export class DragAndDropTesterComponent { }

@Component({
	selector: 'draganddrop-test',
	template: `<div class="drop-zone" (uidrop)="drop($event)"></div>
<p>{{text}}</p>`,
})
export class DragAndDropTestComponent {
	protected text: string;

	protected drop(transfer: DataTransfer): void {
		const textValue = transfer.getData('text');
		if (textValue) {
			this.text = textValue;
		} else if (transfer.files.length > 0) {
			this.text = Utils.collectionToArray(transfer.files).map(f => f.name).join(', ');
		}
	}
}