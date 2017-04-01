import { Component, Input, Output, EventEmitter, ContentChild, ContentChildren, AfterContentInit, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { ListElement } from '../template/ListElement';
import { ListElementSeparator } from '../template/ListElementSeparator';

@Component({
	selector: 'uisearchbox',
	template: `
	<div (focusout)="lostFocus($event)">
		<template [templatecreator]="inputTemplate" [data]="inputData"></template>
		<div class="searchbox-element-list" style="position:relative;" tabindex="0" #searchBoxList (keyup)="keyup($event)">
			<div [hidden]="!isOpen" class="list-elements" style="position:absolute;background:lightgray;box-shadow: 0px 0px 5px #888888;">
				<div *ngFor="let d of dataSource;let i=index;let last=last;" (click)="selectValue(d.value)">
					<template [templatecreator]="listElement.template" [data]="d"></template>
					<template [templatecreator]="listElementSeparator.template" *ngIf="!last && listElementSeparator"></template>
				</div>
			</div>
		</div>
	</div>`,
})
export class SearchboxComponent implements AfterContentInit {
	@ContentChild(TemplateRef) public inputTemplate: TemplateRef<any>;
	@ContentChild(ListElement) public listElement: ListElement;
	@ContentChild(ListElementSeparator) public listElementSeparator: ListElementSeparator;
	@ViewChild('searchBoxList') public searchBoxList: ElementRef;
	@Input('dataSource') dataSourceFactory: (text: string) => Promise<string[]>;
	@Output('valueChange') valueChange: EventEmitter<string> = new EventEmitter<string>();

	inputData: { inputData?: { value?: string, onChange: Function } } = { inputData: { value: '', onChange: (value) => this.onChange(value) } };
	dataSource: { value: string }[] = [];
	isOpen: boolean = false;
	selectedIndex: number = 0;

	public ngAfterContentInit() {
		if (this.listElement == null) {
			throw 'Invalid Searchbox component!\nListElement is a mandatory template.';
		}
		console.warn('template', this.inputTemplate);
	}

	@Input('value')
	set setValue(value: string) {
		this.inputData.inputData.value = value;
		this.valueChange.emit(value);
	}

	selectValue(value: string) {
		this.setValue = value;
		this.isOpen = false;
	}

	lostFocus(event: MouseEvent) {
		if (event.relatedTarget === this.searchBoxList.nativeElement) {
			this.refreshList();
		} else {
			this.isOpen = false;
		}
	}

	keyup(event: KeyboardEvent) {
		if (event.keyCode === 13) { // Enter
			this.selectValue(this.dataSource[this.selectedIndex].value);
		} else if (event.keyCode === 38) { // Up
			if (this.selectedIndex > 0)
				this.selectedIndex--;
		} else if (event.keyCode === 40) { // Down
			if (this.selectedIndex + 1 < this.dataSource.length)
				this.selectedIndex++;
		}
	}

	onChange(value: string) {
		this.inputData.inputData.value = value;
		this.valueChange.emit(value);
		this.refreshList();
	}

	refreshList() {
		this.dataSourceFactory(this.inputData.inputData.value).then(items => {
			this.dataSource = items.map(item => { return { value: item } });
			this.isOpen = true;
			this.selectedIndex = 0;
		});
	}
}
