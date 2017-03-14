import { Component } from '@angular/core';
import { LocalizationService } from 'uitoolkit/localization/LocalizationService';
import { LocalizeTestComponent } from './modules/localize';

@Component({
	selector: 'mainmenu',
	template: `
    <ul>
        <li routerLink="/localize">{{"localize" | localize}}</li>
    </ul>`,
})
export class MainMenuComponent {
}