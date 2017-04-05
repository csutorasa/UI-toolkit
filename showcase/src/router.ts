import { Routes } from '@angular/router';
import { LocalizationResolver } from 'uitoolkit';
import { MainMenuComponent } from './menu';
import { LocalizeTesterComponent } from './modules/localize';
import { ProgressBarTesterComponent } from './modules/progressbar';
import { SliderTesterComponent } from './modules/slider';
import { DragAndDropTesterComponent } from './modules/draganddrop';
import { ButtonTesterComponent } from './modules/button';
import { FileUploadTesterComponent } from './modules/fileupload';
import { SearchBoxTesterComponent } from './modules/searchbox';
import { DataGridTesterComponent } from './modules/datagrid';

export const routerConfig: Routes = [
    {
        path: '',
        children: [{
            path: '',
            component: MainMenuComponent
        },
        {
            path: 'progressbar',
            component: ProgressBarTesterComponent
        },
        {
            path: 'localize',
            component: LocalizeTesterComponent,
        },
        {
            path: 'button',
            component: ButtonTesterComponent,
        },
        {
            path: 'fileupload',
            component: FileUploadTesterComponent,
        },
        {
            path: 'searchbox',
            component: SearchBoxTesterComponent,
        },
        {
            path: 'draganddrop',
            component: DragAndDropTesterComponent,
        },
        {
            path: 'datagrid',
            component: DataGridTesterComponent,
        },
        {
            path: 'slider',
            component: SliderTesterComponent,
        }],
        resolve: {
            localizeData: LocalizationResolver
        }
    }
];