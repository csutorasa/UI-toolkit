import { Component } from '@angular/core';
import { CreateTesterComponentData } from '../source';

@Component(CreateTesterComponentData('slider'))
export class SliderTesterComponent { }

@Component({
	selector: 'slider-test',
	template: `<ui-slider [min]="0" [max]="100" [(value)]="value"></ui-slider>
<div>{{value}}</div>
<ui-slider [min]="0" [max]="100" [(value)]="value2" [step]="5"></ui-slider>
<div>{{value2}}</div>`,
})
export class SliderTestComponent {
	public value: number = 20;
	public value2: number = 20;
}