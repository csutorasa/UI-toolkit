import { Component } from '@angular/core';
import { LocalizationService } from 'uitoolkit/localization/LocalizationService';

@Component({
	selector: 'localize-test',
	template: `
	<h2>{{"localize" | localize}}</h2>
	{{"setLanguage" | localize}}<br>
	<button (click)="set(\'en\')">en</button>
	<button (click)="set(\'hu\')">hu</button>`,
})
export class LocalizeTestComponent {
	constructor(protected localizationService: LocalizationService) {
	}

	public set(code: string) {
		this.localizationService.setLanguageCode(code);
	}
}