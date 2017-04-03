import { Component } from '@angular/core';
import { CreateTesterComponentData } from '../source';

@Component(CreateTesterComponentData('slider'))
export class SliderTesterComponent { }

@Component({
	selector: 'slider-test',
	template: `<uislider [min]="0" [max]="100" [(value)]="value"></uislider>
<div>{{value}}</div>
<uislider [min]="0" [max]="100" [(value)]="value2" [step]="5"></uislider>
<div>{{value2}}</div>`,
})
export class SliderTestComponent {
	public value: number = 20;
	public value2: number = 20;
}