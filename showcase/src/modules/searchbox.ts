import { Component, Input, OnDestroy } from '@angular/core';

@Component({
	selector: 'searchbox-test',
	template: `
    <uisearchbox [dataSource]="dataSource" value="test">
		<input template="let data=inputData;" placeholder="Test input" [ngModel]="data.value" (ngModelChange)="data.onChange($event)"/>
		<uilistelement>
			<div template="let value=value;">{{value}}</div>
		</uilistelement>
	</uisearchbox>`,
})
export class SearchBoxTestComponent {
	dataSource: (text:string) => Promise<string[]>;
	constructor() {
		this.dataSource = (text:string) => Promise.resolve([text + '1', text + '2', text + text + '3']);
	}
}