import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { LocalizationPipe } from './localization/LocalizationPipe';
import { LocalizationResolver } from './localization/LocalizationResolver';
import { LocalizationService } from './localization/LocalizationService';

import { InputTemplate } from './template/InputTemplate';
import { TemplateCreator } from './template/TemplateCreator';

import { ListElementDirective } from './list/ListElementDirective';
import { ListElementSeparatorDirective } from './list/ListElementSeparatorDirective';

import { DragAndDropDirective } from './draganddrop/DropDirective';

import { ProgressBarComponent } from './progressbar/ProgressBarComponent';

import { ButtonDirective } from './button/ButtonDirective';

import { FileUploaderComponent } from './fileuploader/FileUploaderComponent';

import { SearchboxComponent } from './searchbox/SearchboxComponent';

import { Cache } from './storage/Cache';
import { LocalStorage } from './storage/LocalStorage';

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
        InputTemplate,
        ListElementDirective,
        ListElementSeparatorDirective,
        TemplateCreator,
        DragAndDropDirective,
        ProgressBarComponent,
        ButtonDirective,
        FileUploaderComponent,
        SearchboxComponent
    ],
    exports: [
        LocalizationPipe,
        InputTemplate,
        ListElementDirective,
        ListElementSeparatorDirective,
        TemplateCreator,
        DragAndDropDirective,
        ProgressBarComponent,
        ButtonDirective,
        FileUploaderComponent,
        SearchboxComponent
    ]
})
export class UIToolkitModule { }
