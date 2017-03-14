import { Routes } from '@angular/router';
import { LocalizationResolver } from 'uitoolkit/localization/LocalizationResolver';
import { MainMenuComponent } from './menu';
import { LocalizeTestComponent } from './modules/localize';
import { ProgressBarTestComponent } from './modules/progressbar';

export const routerConfig: Routes = [
    {
        path: '',
        children: [{
            path: '',
            component: MainMenuComponent
        },
        {
            path: 'progressbar',
            component: ProgressBarTestComponent
        },
        {
            path: 'localize',
            component: LocalizeTestComponent,
        }],
        resolve: {
            localizeData: LocalizationResolver
        }
    }
];