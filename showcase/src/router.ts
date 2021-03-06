import { Routes } from '@angular/router';
import { LocalizationResolver } from 'wizyx';
import { MainMenuComponent } from './menu';
import { LocalizeTesterComponent } from './modules/localize';
import { ProgressBarTesterComponent } from './modules/progressbar';
import { SliderTesterComponent } from './modules/slider';
import { DragAndDropTesterComponent } from './modules/draganddrop';
import { ButtonTesterComponent } from './modules/button';
import { ExpanderTesterComponent } from './modules/expander';
import { FileUploadTesterComponent } from './modules/fileupload';
import { SearchBoxTesterComponent } from './modules/searchbox';
import { DataGridTesterComponent } from './modules/datagrid';
import { ThemeTesterComponent } from './modules/theme';

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
            path: 'expander',
            component: ExpanderTesterComponent,
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
        },
        {
            path: 'theme',
            component: ThemeTesterComponent,
        }],
        resolve: {
            localizeData: LocalizationResolver
        }
    }
];