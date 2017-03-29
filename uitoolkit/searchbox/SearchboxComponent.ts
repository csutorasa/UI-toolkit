import { Component, Input, Output, EventEmitter, ContentChild, ContentChildren, AfterContentInit, TemplateRef } from '@angular/core';
import { ListElement } from '../template/ListElement';

@Component({
	selector: 'uisearchbox',
	template: `
	<div>
		<template [templatecreator]="inputTemplate" [data]="inputData"></template>
		<div *ngFor="let d of dataSource">
			<template [templatecreator]="listElement.template" [data]="d"></template>
		</div>
	</div>`,
})
export class SearchboxComponent implements AfterContentInit {
    @ContentChild(TemplateRef) public inputTemplate: TemplateRef<any>;
    @ContentChild(ListElement) public listElement: ListElement;
	@Input('dataSource') dataSourceFactory: (text: string) => Promise<string[]>;
	@Output('valueChange') valueChange: EventEmitter<string> = new EventEmitter<string>();

	inputData: { inputData?: { value?: string, onChange: Function}} = { inputData: { value: '', onChange: (value) => this.onChange(value)}};
	dataSource: { value: String }[] = [];

    public ngAfterContentInit() {
		if (this.listElement == null) {
			throw 'Invalid Searchbox component!\nListElement is a mandatory template.';
		}
		console.warn('template', this.inputTemplate);
    }
	
	@Input('value')
	set setValue(value: string) {
		this.inputData.inputData.value = value;
	}

	onChange(value: string) {
		this.inputData.inputData.value = value;
		this.valueChange.emit(value);
		this.refreshList();
	}

	refreshList() {
		this.dataSourceFactory(this.inputData.inputData.value).then(items => {
			this.dataSource = items.map(item => { return { value: item }});
		});
	}
}
