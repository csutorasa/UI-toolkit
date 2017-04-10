import { Component, Input, ContentChild, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Utils } from '../utils/Utils';

@Component({
	selector: 'ui-progressbar',
	template: `<div class="ui-progressbar-background">
	<div #fill class="ui-progressbar-foreground"></div>
</div>`,
})
export class ProgressBarComponent implements AfterViewInit {
	@Input('min') protected min: number;
	@Input('max') protected max: number;
	@ViewChild('fill') protected div: ElementRef;

	private innerValue: number;

	/**
	 * Sets the value
	 */
	@Input('value')
	public set value(value: number) {
		if (this.div) {
			this.div.nativeElement.style.width = this.calculatePercent(value) + '%';
		}
		this.innerValue = value;
	}

	public ngAfterViewInit(): void {
		this.value = this.innerValue;
	}

	protected calculatePercent(value: number): number {
		if (Utils.numberEquals(this.max, this.min)) {
			return 0;
		}
		const calculated = ((value - this.min) / this.max - this.min) * 100;
		return Utils.limit(calculated, 0, 100);
	}
}