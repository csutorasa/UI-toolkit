import { Component, Input, Output, EventEmitter, ContentChild, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Utils } from '../utils/Utils';

@Component({
	selector: 'wx-slider',
	template: `<div #slider class="wx-slider-background" (mousedown)="down($event)" (touchstart)="touchStart($event)">
	<div #fill class="wx-slider-foreground" [ngClass]="{'mouse-down': drag}"></div>
</div>`,
})
export class SliderComponent implements AfterViewInit {
	@Output('valueChange') public readonly valueChange: EventEmitter<number> = new EventEmitter();
	@Input('min') protected min: number;
	@Input('max') protected max: number;
	@Input('step') protected step: number;
	@ViewChild('slider') protected sliderDiv: ElementRef;
	@ViewChild('fill') protected fillDiv: ElementRef;

	private static MINIMUM_MOUSE_MOVE_UPDATE_DELAY: number = 20;
	protected innerValue: number;
	protected drag: boolean = false;
	protected clickOffset: number;
	private mouseMoveEventHandler: (event: MouseEvent) => void;
	private mouseUpEventHandler: (event: MouseEvent) => void;
	private lastMove: number = new Date().getTime();

	/**
	 * Sets the value
	 */
	@Input('value')
	public set value(value: number) {
		let actualValue = value;
		if (this.step != null) {
			actualValue = Math.round(value / this.step) * this.step;
		}
		if (this.fillDiv) {
			this.fillDiv.nativeElement.style.width = this.calculatePercent(actualValue) + '%';
		}
		if (this.innerValue !== actualValue) {
			this.innerValue = actualValue;
			this.valueChange.emit(actualValue);
		}
	}

	public ngAfterViewInit(): void {
		this.value = this.innerValue;
	}

	protected down(event: MouseEvent): void {
		this.value = this.calculateValue(event.pageX);
		this.clickOffset = event.pageX;
		this.mouseMoveEventHandler = (event => this.move(event));
		this.mouseUpEventHandler = (event => this.up(event));
		Utils.clearSelection();
		document.addEventListener('mousemove', this.mouseMoveEventHandler);
		document.addEventListener('mouseup', this.mouseUpEventHandler);
	}

	protected touchStart(event: TouchEvent): void {
		if(event.touches.length !== 1) {
			return;
		}
		const touch = event.touches.item(0);
		this.value = this.calculateValue(touch.pageX);
		this.clickOffset = touch.pageX;
		const moveEventHandler = ((event: TouchEvent) => this.move(event.touches.item(0)));
		const upHandler = ((event: TouchEvent) => {
			this.value = this.calculateValue(event.changedTouches.item(0).pageX);
			document.removeEventListener('touchmove', moveEventHandler);
			document.removeEventListener('touchend', upHandler);
			this.drag = false;
		});
		Utils.clearSelection();
		document.addEventListener('touchmove', moveEventHandler);
		document.addEventListener('touchend', upHandler);
	}

	protected move(event: MouseEvent | Touch): void {
		if (Math.abs(this.clickOffset - event.pageX) > 5) {
			this.drag = true;
		}
		if (new Date().getTime() - this.lastMove > SliderComponent.MINIMUM_MOUSE_MOVE_UPDATE_DELAY) {
			this.value = this.calculateValue(event.pageX);
			this.lastMove = new Date().getTime();
		}
	}

	protected up(event: MouseEvent): void {
		this.value = this.calculateValue(event.pageX);
		document.removeEventListener('mousemove', this.mouseMoveEventHandler);
		document.removeEventListener('mouseup', this.mouseUpEventHandler);
		this.drag = false;
	}

	protected calculateValue(x: number) {
		const sliderDivNative: HTMLScriptElement = (<HTMLScriptElement>this.sliderDiv.nativeElement);
		// x is relative position of the click to document
		// sliderDivNative.getBoundingClientRect().left is the relative position to the (scrolled) screen
		// window.pageXOffset is the scroll from the left side of the page
		// sliderDivNative.clientWidth is the inner width of the element (excluding border and margin)
		const ratio = (x - sliderDivNative.getBoundingClientRect().left - window.pageXOffset) / sliderDivNative.clientWidth;
		if (Utils.numberEquals(this.max, this.min)) {
			return this.min;
		}
		return Utils.limit(this.min + ratio * (this.max - this.min), this.min, this.max);
	}

	protected calculatePercent(value: number): number {
		if (Utils.numberEquals(this.max, this.min)) {
			return 0;
		}
		const calculated = ((value - this.min) / this.max - this.min) * 100;
		return Utils.limit(calculated, 0, 100);
	}
}