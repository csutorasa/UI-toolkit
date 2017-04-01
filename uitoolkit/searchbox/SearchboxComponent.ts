import { Component, Input, Output, EventEmitter, ContentChild, ContentChildren, AfterContentInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { InputTemplate } from '../template/InputTemplate';
import { ListElement } from '../template/ListElement';
import { ListElementSeparator } from '../template/ListElementSeparator';

export type SearchBoxDataSource = { value: string }[];
export interface InputTemplateData {
	data: { value: string };
	events: {
		onChange: (value: string) => void,
		onKeydown: (event: KeyboardEvent) => void
	};
}
export interface ElementDataInput { 
	selectedIndex: number;
};
export class ElementData {
	constructor(private input: ElementDataInput, public value: string, public last: boolean, private index: number) {

	}
	
	public get selected(): boolean {
		return this.index === this.input.selectedIndex;
	}

	public get first(): boolean {
		return this.index === 0;
	}
}

@Component({
	selector: 'uisearchbox',
	template: `<div (focusout)="lostFocus($event)">
	<template [templatecreator]="inputTemplate.template" [data]="inputTemplateData"></template>
	<div class="searchbox-element-list" tabindex="0" #searchBoxList (keydown)="keydown($event)">
		<div [hidden]="!isOpen" class="searchbox-list-elements" #elementContainer>
			<div *ngFor="let d of dataSource;let i=index;let last=last;" (click)="selectValue(d.value)" class="searchbox-list-element">
				<template [templatecreator]="listElement.template" [data]="d"></template>
				<template [templatecreator]="listElementSeparator.template" *ngIf="!last && listElementSeparator"></template>
			</div>
		</div>
	</div>
</div>`,
})
export class SearchboxComponent implements AfterContentInit {
	@ContentChild(InputTemplate) public inputTemplate: InputTemplate;
	@ContentChild(ListElement) public listElement: ListElement;
	@ContentChild(ListElementSeparator) public listElementSeparator: ListElementSeparator;
	@ViewChild('searchBoxList') public searchBoxList: ElementRef;
	@ViewChild('elementContainer') public elementContainer: ElementRef;
	@Input('dataSource') dataSourceFactory: (text: string) => Promise<string[]>;
	@Output('valueChange') valueChange: EventEmitter<string> = new EventEmitter<string>();

	inputTemplateData: InputTemplateData = { data: { value: '' }, events: { onChange: (value) => this.onChange(value), onKeydown: (event) => this.keydown(event) } };
	dataSource: ElementData[] = [];
	isOpen: boolean = false;
	elementDataInput: ElementDataInput = {
		selectedIndex: 0
	};

	public ngAfterContentInit(): void {
		if (this.listElement == null) {
			throw 'Invalid Searchbox component!\nInputTemplate is a mandatory template.';
		}
		if (this.listElement == null) {
			throw 'Invalid Searchbox component!\nListElement is a mandatory template.';
		}
	}

	@Input('value')
	set setValue(value: string) {
		if (this.inputTemplateData.data.value !== value) {
			this.inputTemplateData.data.value = value;
			this.valueChange.emit(value);
		}
	}

	selectValue(value: string): void {
		this.setValue = value;
		this.isOpen = false;
	}

	lostFocus(event: MouseEvent): void {
		if (event.relatedTarget === this.searchBoxList.nativeElement) {
			if(!this.isOpen) {
				this.refreshList();
			}
		} else {
			this.isOpen = false;
		}
	}

	keydown(event: KeyboardEvent): void {
		if (!this.isOpen) {
			return;
		}
		if (event.keyCode === 13) { // Enter
			this.selectValue(this.dataSource[this.elementDataInput.selectedIndex].value);
		} else if (event.keyCode === 38) { // Up
			if (this.elementDataInput.selectedIndex > 0) {
				this.elementDataInput.selectedIndex--;
				const container = <HTMLScriptElement>this.elementContainer.nativeElement;
				const div = container.children[this.elementDataInput.selectedIndex];
				if((<any>div).offsetTop < container.scrollTop) {
					container.scrollTop -= container.scrollTop - (<any>div).offsetTop;
				}
			}
		} else if (event.keyCode === 40) { // Down
			if (this.elementDataInput.selectedIndex + 1 < this.dataSource.length) {
				this.elementDataInput.selectedIndex++;
				const container = <HTMLScriptElement>this.elementContainer.nativeElement;
				const div = container.children[this.elementDataInput.selectedIndex];
				const offsetBottom = (<any>div).offsetTop + div.getBoundingClientRect().height;
				const scrollBottom = container.scrollTop + container.getBoundingClientRect().height;
				if(offsetBottom > scrollBottom) {
					container.scrollTop += offsetBottom - scrollBottom;
				}
			}
		}
	}

	onChange(value: string): void {
		this.inputTemplateData.data.value = value;
		this.valueChange.emit(value);
		this.refreshList();
	}

	refreshList(): void {
		this.dataSourceFactory(this.inputTemplateData.data.value).then(items => {
			this.dataSource = items.map((item, index) => { return new ElementData(this.elementDataInput, item, index === items.length -1, index); });
			this.isOpen = true;
			this.elementDataInput.selectedIndex = 0;
			const container = <HTMLScriptElement>this.elementContainer.nativeElement;
			container.scrollTop = 0;
		});
	}
}
