import { Component } from '@angular/core';
import { LocalizationService } from 'wizyx';
import { CreateTesterComponentData } from '../source';

@Component(CreateTesterComponentData('localize'))
export class LocalizeTesterComponent {}

@Component({
	selector: 'localize-test',
	template: `<h2>{{"localize" | localize}}</h2>
<h5>{{"setLanguage" | localize}}</h5>
<button (click)="setLanguageCode(\'en\')" buttonstyle="info">en</button>
<button (click)="setLanguageCode(\'hu\')" buttonstyle="info">hu</button>`,
})
export class LocalizeTestComponent {
	constructor(protected localizationService: LocalizationService) {
	}

	public setLanguageCode(code: string): void {
		this.localizationService.setLanguageCode(code);
		location.reload();
	}
}