import { Component, Input, Output, EventEmitter, ContentChild, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
	selector: 'uislider',
	template: `<div #slider class="slider-background" (click)="click($event)">
	<div #fill class="slider-foreground" (click)="click($event)"></div>
</div>`,
})
export class SliderComponent implements AfterViewInit {
	@Input('min') protected min: number;
	@Input('max') protected max: number;
	@ViewChild('slider') protected sliderDiv: ElementRef;
	@ViewChild('fill') protected fillDiv: ElementRef;
	@Output('valueChange') protected valueChange: EventEmitter<number> = new EventEmitter();

	private innerValue: number;

	@Input('value')
	public set value(value: number) {
		if (this.fillDiv) {
			this.fillDiv.nativeElement.style.width = this.calculatePercent(value) + '%';
		}
		if (this.innerValue !== value) {
			this.innerValue = value;
			this.valueChange.emit(value);
			console.log('update', value);
		}
	}

	public ngAfterViewInit(): void {
		this.value = this.innerValue;
	}

	protected click(event: MouseEvent): void {
		const ratio = event.offsetX / (<HTMLScriptElement>this.sliderDiv.nativeElement).clientWidth;
		this.value = this.min + ratio * (this.max - this.min);
	}

	protected calculatePercent(value: number): number {
		if (Math.abs(this.max - this.min) < 0.000001) {
			return 0;
		}
		const calculated = ((value - this.min) / this.max - this.min) * 100;
		if (calculated > 100)
			return 100;
		else if (calculated < 0)
			return 0;
		else
			return calculated;
	}
}