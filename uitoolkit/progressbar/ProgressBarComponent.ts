import { Component, Input, ContentChild, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
	selector: 'uiprogressbar',
	template: `
	<div class="progressbar-background">
		<div #fill class="progressbar-foreground"></div>
	</div>`,
})
export class ProgressBarComponent implements AfterViewInit {
	@Input('min') min: number;
	@Input('max') max: number;
	@ViewChild('fill') div: ElementRef;

	private innerValue: number;

	@Input('value')
	public set value(value: number) {
		if (this.div) {
			this.div.nativeElement.style.width = this.calculatePercent(value) + '%';
		}
		this.innerValue = value;
	}

	ngAfterViewInit() {
		this.value = this.innerValue;
	}

	protected calculatePercent(value: number): number {
		const calculated = ((value - this.min) / this.max - this.min) * 100;
		if (calculated > 100)
			return 100;
		else if (calculated < 0)
			return 0;
		else
			return calculated;
	}
}