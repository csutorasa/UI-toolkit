import { Component } from '@angular/core';
import { Utils } from 'uitoolkit/utils/Utils';

@Component({
	selector: 'draganddrop-tester',
	template: `
    <sources>
        <draganddrop-test #sources></draganddrop-test>
    </sources>`,
})
export class DragAndDropTesterComponent {}

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
			this.text = Utils.CollectionToArray(transfer.files).map(f => f.name).join(', ');
		}
	}
}