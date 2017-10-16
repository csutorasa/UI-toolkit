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

import { DragDirective } from './draganddrop/DragDirective';
export { DragDirective } from './draganddrop/DragDirective';
import { DropDirective } from './draganddrop/DropDirective';
export { DropDirective } from './draganddrop/DropDirective';
import { DragAndDropService, DragEventContext } from './draganddrop/DragAndDropService';
export { DragAndDropService, DragEventContext } from './draganddrop/DragAndDropService';

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

import { ThemeService } from './theme/ThemeService';
export { ThemeService } from './theme/ThemeService';

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
        LocalStorage,
        ThemeService,
        DragAndDropService
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
        DragDirective,
        DropDirective,
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
        DragDirective,
        DropDirective,
        ProgressBarComponent,
        SliderComponent,
        ButtonDirective,
        ExpanderComponent,
        FileUploaderComponent,
        SearchboxComponent
    ]
})
export class WizyxModule { }
