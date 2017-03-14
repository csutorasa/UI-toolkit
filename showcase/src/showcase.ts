import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { LocalizationService } from 'uitoolkit/localization/LocalizationService';

@Component({
	selector: 'my-app',
	template: '<h1 routerLink="/">Showcase</h1><router-outlet></router-outlet>',
})
export class Showcase {
	constructor(protected localizationService: LocalizationService, protected http: Http) {
		localizationService.config(
			() => this.http.post('/languages', {}).map(res => res.json()).toPromise(),
			(lang) => this.http.post('/localization', {language: lang}).map(res => res.json()).toPromise()
		);
	}
}