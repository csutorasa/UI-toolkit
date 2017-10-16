import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { LocalizationService, ThemeService } from 'wizyx';
import { Observable } from 'rxjs/Rx';

@Component({
	selector: 'my-app',
	template: `<div class="showcase-content">
	<a class="showcase" routerLink="/">Showcase</a>
	<router-outlet></router-outlet>
</div>`,
})
export class Showcase {
	constructor(protected localizationService: LocalizationService, protected http: Http, protected themeService: ThemeService ) {
		themeService.restore();
		localizationService.config(
			() => this.http.post('/languages', {}).map(res => res.json()).toPromise(),
			(lang) => this.http.post('/localization', { language: lang }).map(res => res.json()).toPromise()
		);
	}
}