import { Component } from '@angular/core';
import { LocalizationService } from 'uitoolkit/localization/LocalizationService';
import { LocalizeTestComponent } from './modules/localize';
import { ProgressBarTestComponent } from './modules/progressbar';

@Component({
	selector: 'mainmenu',
	template: `
    <ul>
        <li><a class="mainmenu-item" routerLink="/localize">{{"localize" | localize}}</a></li>
        <li><a class="mainmenu-item" routerLink="/progressbar">{{"progressbar" | localize}}</a></li>
        <li><a class="mainmenu-item" routerLink="/draganddrop">{{"draganddrop" | localize}}</a></li>
        <li><a class="mainmenu-item" routerLink="/button">{{"button" | localize}}</a></li>
        <li><a class="mainmenu-item" routerLink="/searchbox">{{"searchbox" | localize}}</a></li>
        <li><a class="mainmenu-item" routerLink="/fileupload">{{"fileuploader" | localize}}</a></li>
    </ul>`,
})
export class MainMenuComponent {
}