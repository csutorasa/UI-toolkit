import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { LocalizationPipe } from './localization/LocalizationPipe';
export { LocalizationPipe } from './localization/LocalizationPipe';
import { LocalizationResolver } from './localization/LocalizationResolver';
export { LocalizationResolver } from './localization/LocalizationResolver';
import { LocalizationService } from './localization/LocalizationService';
export { LocalizationService } from './localization/LocalizationService';

import { ContentTemplate } from './template/ContentTemplate';
export { ContentTemplate } from './template/ContentTemplate';
import { InputTemplate } from './template/InputTemplate';
export { InputTemplate } from './template/InputTemplate';
import { TemplateCreator } from './template/TemplateCreator';
export { TemplateCreator } from './template/TemplateCreator';

import { ListElementDirective } from './list/ListElementDirective';
export { ListElementDirective } from './list/ListElementDirective';
import { ListElementSeparatorDirective } from './list/ListElementSeparatorDirective';
export { ListElementSeparatorDirective } from './list/ListElementSeparatorDirective';

import { ColumnDirective } from './datagrid/ColumnDirective';
export { ColumnDirective } from './datagrid/ColumnDirective';
import { DataGridComponent } from './datagrid/DataGridComponent';
export { DataGridComponent } from './datagrid/DataGridComponent';

import { DragAndDropDirective } from './draganddrop/DropDirective';
export { DragAndDropDirective } from './draganddrop/DropDirective';

import { ProgressBarComponent } from './progressbar/ProgressBarComponent';
export { ProgressBarComponent } from './progressbar/ProgressBarComponent';

import { SliderComponent } from './slider/SliderComponent';
export { SliderComponent } from './slider/SliderComponent';

import { ButtonDirective } from './button/ButtonDirective';
export { ButtonDirective } from './button/ButtonDirective';

import { ExpanderComponent } from './expander/ExpanderComponent';
export { ExpanderComponent } from './expander/ExpanderComponent';

import { FileUploaderComponent } from './fileuploader/FileUploaderComponent';
export { FileUploaderComponent } from './fileuploader/FileUploaderComponent';

import { SearchboxComponent } from './searchbox/SearchboxComponent';
export { SearchboxComponent } from './searchbox/SearchboxComponent';

import { Cache } from './storage/Cache';
export { Cache } from './storage/Cache';
import { LocalStorage } from './storage/LocalStorage';
export { LocalStorage } from './storage/LocalStorage';

export { Utils } from './utils/Utils';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [
        Cache,
        LocalizationService,
        LocalizationResolver,
        LocalStorage
    ],
    declarations: [
        LocalizationPipe,
        ContentTemplate,
        InputTemplate,
        ListElementDirective,
        ListElementSeparatorDirective,
        TemplateCreator,
        ColumnDirective,
        DataGridComponent,
        DragAndDropDirective,
        ProgressBarComponent,
        SliderComponent,
        ButtonDirective,
        ExpanderComponent,
        FileUploaderComponent,
        SearchboxComponent
    ],
    exports: [
        LocalizationPipe,
        ContentTemplate,
        InputTemplate,
        ListElementDirective,
        ListElementSeparatorDirective,
        TemplateCreator,
        ColumnDirective,
        DataGridComponent,
        DragAndDropDirective,
        ProgressBarComponent,
        SliderComponent,
        ButtonDirective,
        ExpanderComponent,
        FileUploaderComponent,
        SearchboxComponent
    ]
})
export class WizyxModule { }
