import { Component } from '@angular/core';
import { CreateTesterComponentData } from '../source';

@Component(CreateTesterComponentData('progressbar'))
export class ProgressBarTesterComponent { }

@Component({
	selector: 'progressbar-test',
	template: `<uiprogressbar [min]="0" [max]="100" [value]="value"></uiprogressbar>
<button (click)="value = 0">0</button>
<button (click)="value = 20">20</button>
<button (click)="value = 50">50</button>
<button (click)="value = 100">100</button>`,
})
export class ProgressBarTestComponent {
	public value: number = 20;
}