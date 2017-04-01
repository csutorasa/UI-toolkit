import { Routes } from '@angular/router';
import { LocalizationResolver } from 'uitoolkit/localization/LocalizationResolver';
import { MainMenuComponent } from './menu';
import { LocalizeTestComponent } from './modules/localize';
import { ProgressBarTestComponent } from './modules/progressbar';
import { DragAndDropTestComponent } from './modules/draganddrop';
import { ButtonTestComponent } from './modules/button';
import { FileUploadTestComponent } from './modules/fileupload';
import { SearchBoxTestComponent } from './modules/searchbox';

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
        },
        {
            path: 'button',
            component: ButtonTestComponent,
        },
        {
            path: 'fileupload',
            component: FileUploadTestComponent,
        },
        {
            path: 'searchbox',
            component: SearchBoxTestComponent,
        },
        {
            path: 'draganddrop',
            component: DragAndDropTestComponent,
        }],
        resolve: {
            localizeData: LocalizationResolver
        }
    }
];