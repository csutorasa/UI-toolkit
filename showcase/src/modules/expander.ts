import { Component } from '@angular/core';
import { CreateTesterComponentData } from '../source';

@Component(CreateTesterComponentData('expander'))
export class ExpanderTesterComponent { }

@Component({
	selector: 'expander-test',
	template: `<wx-expander [(isopen)]="isOpen">
	<wx-inputtemplate>
		<div *template>
			<button (click)="toggleIsOpen()">{{ (isOpen ? 'close' : 'open') | localize }}</button>
		</div>
	</wx-inputtemplate>
	<wx-content>
		<div *template>
			<ul>
				<li>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</li>
				<li>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</li>
				<li>Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.</li>
				<li>Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.</li>
			</ul>
		</div>
	</wx-content>
</wx-expander>

<wx-expander [(isopen)]="isOpen2">
	<wx-inputtemplate>
		<div *template>
			<button (click)="toggleIsOpen2()">{{ (isOpen2 ? 'close' : 'open') | localize }}</button>
		</div>
	</wx-inputtemplate>
	<wx-content>
		<div *template>
			<ul>
				<li>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</li>
				<li>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</li>
				<li>Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.</li>
				<li>Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.</li>
			</ul>
		</div>
	</wx-content>
</wx-expander>`,
})
export class ExpanderTestComponent {
	protected isOpen: boolean = false;
	protected isOpen2: boolean = true;

	public toggleIsOpen(): void {
		this.isOpen = !this.isOpen;
	}

	public toggleIsOpen2(): void {
		this.isOpen2 = !this.isOpen2;
	}
}