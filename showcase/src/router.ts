import { Routes } from '@angular/router';
import { LocalizationResolver } from 'uitoolkit/localization/LocalizationResolver';
import { MainMenuComponent } from './menu';
import { LocalizeTestComponent } from './modules/localize';

export const routerConfig: Routes = [
    {
        path: '',
        component: MainMenuComponent,
        resolve: {
            localizeData: LocalizationResolver
        }
    },
    {
        path: 'localize',
        component: LocalizeTestComponent,
        resolve: {
            localizeData: LocalizationResolver
        }
    }
];