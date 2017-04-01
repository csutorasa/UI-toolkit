import { Component, Input, OnDestroy } from '@angular/core';

@Component({
	selector: 'searchbox-test',
	template: `
	<h3>Plain</h3>
    <uisearchbox [dataSource]="dataSource">
		<uiinputtemplate>
			<input template="let data=data;let events=events" [ngModel]="data.value" (ngModelChange)="events.onChange($event)" (keyup)="events.onKeyup($event)"/>
		</uiinputtemplate>
		<uilistelement>
			<div template="let value=value;" class="list-element-nostyle">{{value}}</div>
		</uilistelement>
	</uisearchbox>
	<h3>With design</h3>
    <uisearchbox [dataSource]="dataSource" value="test">
		<uiinputtemplate>
			<input template="let data=data;let events=events" class="input-template" placeholder="Test input" [ngModel]="data.value" (ngModelChange)="events.onChange($event)" (keyup)="events.onKeyup($event)" spellcheck="false"/>
		</uiinputtemplate>
		<uilistelement>
			<div template="let value=value;let selected=selected;let first=first;let last=last;" class="list-element"
			[ngClass]="{'list-element-selected': selected, 'list-element-first': first, 'list-element-last': last}">{{value}}</div>
		</uilistelement>
		<uilistelementseparator>
			<div template class="list-element-separator"></div>
		</uilistelementseparator>
	</uisearchbox>`,
})
export class SearchBoxTestComponent {
	dataSource: (text:string) => Promise<string[]>;
	constructor() {
		this.dataSource = (text:string) => Promise.resolve([text + '1', text + '2', text + text + '3']);
	}
}