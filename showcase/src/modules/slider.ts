import { Component } from '@angular/core';
import { CreateTesterComponentData } from '../source';

@Component(CreateTesterComponentData('slider'))
export class SliderTesterComponent { }

@Component({
	selector: 'slider-test',
	template: `<wx-slider [min]="0" [max]="100" [(value)]="value"></wx-slider>
<div>{{value}}</div>
<wx-slider [min]="0" [max]="100" [(value)]="value2" [step]="5"></wx-slider>
<div>{{value2}}</div>`,
})
export class SliderTestComponent {
	public value: number = 20;
	public value2: number = 20;
}