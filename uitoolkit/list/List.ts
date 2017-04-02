import { ContentChild, AfterContentInit } from '@angular/core';
import { ListElementDirective } from './ListElementDirective';
import { ListElementSeparatorDirective } from './ListElementSeparatorDirective';

export abstract class List implements AfterContentInit {
	@ContentChild(ListElementDirective) public listElement: ListElementDirective;
	@ContentChild(ListElementSeparatorDirective) public listElementSeparator: ListElementSeparatorDirective;

	public ngAfterContentInit(): void {
		if (this.listElement == null) {
			throw 'Invalid List component! ListElement is a mandatory template.';
		}
	}
}