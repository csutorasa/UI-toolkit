import { Component, Input, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { CreateTesterComponentData } from '../source';
import { Observable } from 'rxjs/Rx';

@Component(CreateTesterComponentData('searchbox'))
export class SearchBoxTesterComponent { }

@Component({
	selector: 'searchbox-test',
	template: `<h3>Plain</h3>
<wx-searchbox [dataSource]="dataSource">
	<wx-inputtemplate>
		<input #input *template="let data=data;let events=events" [ngModel]="data.value" (ngModelChange)="events.onChange($event)" (keydown)="events.onKeydown($event)"/>
	</wx-inputtemplate>
	<wx-listelement>
		<div *template="let value=value;" class="list-element-nostyle">{{value}}</div>
	</wx-listelement>
</wx-searchbox>

<h3>With design</h3>
<wx-searchbox [dataSource]="dataSource" value="test">
	<wx-inputtemplate>
		<input *template="let data=data;let events=events" class="input-template" placeholder="Test input" [ngModel]="data.value" (ngModelChange)="events.onChange($event)" (keydown)="events.onKeydown($event)" spellcheck="false"/>
	</wx-inputtemplate>
	<wx-listelement>
		<div *template="let value=value;let selected=selected;let first=first;let last=last;" class="list-element"
		[ngClass]="{'list-element-selected': selected, 'list-element-first': first, 'list-element-last': last}">{{value}}</div>
	</wx-listelement>
	<wx-listelementseparator>
		<div *template class="list-element-separator"></div>
	</wx-listelementseparator>
</wx-searchbox>

<h3>With remote search</h3>
<wx-searchbox [dataSource]="remoteDataSource" value="test">
	<wx-inputtemplate>
		<input *template="let data=data;let events=events" class="input-template" placeholder="Test input" [ngModel]="data.value" (ngModelChange)="events.onChange($event)" (keydown)="events.onKeydown($event)" spellcheck="false"/>
	</wx-inputtemplate>
	<wx-listelement>
		<div *template="let value=value;let selected=selected;let first=first;let last=last;" class="list-element"
		[ngClass]="{'list-element-selected': selected, 'list-element-first': first, 'list-element-last': last}">{{value}}</div>
	</wx-listelement>
	<wx-listelementseparator>
		<div *template class="list-element-separator"></div>
	</wx-listelementseparator>
</wx-searchbox>`,
})
export class SearchBoxTestComponent {
	protected dataSource: (text: string) => Promise<string[]>;
	protected remoteDataSource: (text: string) => Promise<string[]>;
	constructor(http: Http) {
		this.dataSource = (text: string) => Promise.resolve([text + '1', text + '2', text + text + '3']);
		this.remoteDataSource = (text: string) => http.post('/search', { search: text }).map(res => res.json()).toPromise();
	}
}