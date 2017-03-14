import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { LocalizationService } from 'uitoolkit/localization/LocalizationService';

@Component({
	selector: 'my-app',
	template: `
	<div class="showcase-content">
		<h1 routerLink="/" class="showcase">Showcase</h1>
		<router-outlet></router-outlet>
	</div>`,
})
export class Showcase {
	constructor(protected localizationService: LocalizationService, protected http: Http) {
		localizationService.config(
			() => this.http.post('/languages', {}).map(res => res.json()).toPromise(),
			(lang) => this.http.post('/localization', {language: lang}).map(res => res.json()).toPromise()
		);
	}
}