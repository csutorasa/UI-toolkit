import { ContentChild, AfterContentInit } from '@angular/core';
import { ListElement } from './ListElement';
import { ListElementSeparator } from './ListElementSeparator';

export abstract class List implements AfterContentInit {
	@ContentChild(ListElement) public listElement: ListElement;
	@ContentChild(ListElementSeparator) public listElementSeparator: ListElementSeparator;

	public ngAfterContentInit(): void {
		if (this.listElement == null) {
			throw 'Invalid List component! ListElement is a mandatory template.';
		}
	}
}