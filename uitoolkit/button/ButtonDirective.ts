import { Directive } from '@angular/core';

@Directive({
	selector: 'button',
})
export class ButtonDirective {
	constructor() {
		console.log('Button found');
	}
}