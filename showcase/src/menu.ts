import { Component } from '@angular/core';
import { LocalizationService } from 'uitoolkit/localization/LocalizationService';
import { LocalizeTestComponent } from './modules/localize';
import { ProgressBarTestComponent } from './modules/progressbar';

@Component({
	selector: 'mainmenu',
	template: `
    <ul>
        <li routerLink="/localize" class="mainmenu-item">{{"localize" | localize}}</li>
        <li routerLink="/progressbar" class="mainmenu-item">{{"progressbar" | localize}}</li>
    </ul>`,
})
export class MainMenuComponent {
}