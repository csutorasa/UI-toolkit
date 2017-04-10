import { ContentChild, AfterContentInit } from '@angular/core';
import { ListElementDirective } from './ListElementDirective';
import { ListElementSeparatorDirective } from './ListElementSeparatorDirective';

export abstract class List implements AfterContentInit {
	/**
	 * List element template
	 */
	@ContentChild(ListElementDirective) public listElement: ListElementDirective;
	/**
	 * List element separator template
	 */
	@ContentChild(ListElementSeparatorDirective) public listElementSeparator: ListElementSeparatorDirective;

	public ngAfterContentInit(): void {
		if (this.listElement == null) {
			throw 'Invalid List component! ListElement is a mandatory template.';
		}
	}
}