import { Component, Input, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { CreateTesterComponentData } from '../source';
import { Observable } from 'rxjs/Rx';

@Component(CreateTesterComponentData('searchbox'))
export class SearchBoxTesterComponent { }

@Component({
	selector: 'searchbox-test',
	template: `<h3>Plain</h3>
<uisearchbox [dataSource]="dataSource">
	<uiinputtemplate>
		<input #input *template="let data=data;let events=events" [ngModel]="data.value" (ngModelChange)="events.onChange($event)" (keydown)="events.onKeydown($event)"/>
	</uiinputtemplate>
	<uilistelement>
		<div *template="let value=value;" class="list-element-nostyle">{{value}}</div>
	</uilistelement>
</uisearchbox>

<h3>With design</h3>
<uisearchbox [dataSource]="dataSource" value="test">
	<uiinputtemplate>
		<input *template="let data=data;let events=events" class="input-template" placeholder="Test input" [ngModel]="data.value" (ngModelChange)="events.onChange($event)" (keydown)="events.onKeydown($event)" spellcheck="false"/>
	</uiinputtemplate>
	<uilistelement>
		<div *template="let value=value;let selected=selected;let first=first;let last=last;" class="list-element"
		[ngClass]="{'list-element-selected': selected, 'list-element-first': first, 'list-element-last': last}">{{value}}</div>
	</uilistelement>
	<uilistelementseparator>
		<div *template class="list-element-separator"></div>
	</uilistelementseparator>
</uisearchbox>

<h3>With remote search</h3>
<uisearchbox [dataSource]="remoteDataSource" value="test">
	<uiinputtemplate>
		<input *template="let data=data;let events=events" class="input-template" placeholder="Test input" [ngModel]="data.value" (ngModelChange)="events.onChange($event)" (keydown)="events.onKeydown($event)" spellcheck="false"/>
	</uiinputtemplate>
	<uilistelement>
		<div *template="let value=value;let selected=selected;let first=first;let last=last;" class="list-element"
		[ngClass]="{'list-element-selected': selected, 'list-element-first': first, 'list-element-last': last}">{{value}}</div>
	</uilistelement>
	<uilistelementseparator>
		<div *template class="list-element-separator"></div>
	</uilistelementseparator>
</uisearchbox>`,
})
export class SearchBoxTestComponent {
	protected dataSource: (text: string) => Promise<string[]>;
	protected remoteDataSource: (text: string) => Promise<string[]>;
	constructor(http: Http) {
		this.dataSource = (text: string) => Promise.resolve([text + '1', text + '2', text + text + '3']);
		this.remoteDataSource = (text: string) => http.post('/search', text).map(res => res.json()).toPromise();
	}
}