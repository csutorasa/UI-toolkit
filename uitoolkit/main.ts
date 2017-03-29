import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { LocalizationPipe } from './localization/LocalizationPipe';
import { LocalizationResolver } from './localization/LocalizationResolver';
import { LocalizationService } from './localization/LocalizationService';

import { ListElement } from './template/ListElement';
import { TemplateCreator } from './template/TemplateCreator';

import { ProgressBarComponent } from './progressbar/ProgressBarComponent';

import { ButtonDirective } from './button/ButtonDirective';

import { FileUploaderComponent } from './fileuploader/FileuploaderComponent';

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
        ListElement,
        TemplateCreator,
        ProgressBarComponent,
        ButtonDirective,
        FileUploaderComponent,
        SearchboxComponent
    ],
    exports: [
        LocalizationPipe,
        ListElement,
        TemplateCreator,
        ProgressBarComponent,
        ButtonDirective,
        FileUploaderComponent,
        SearchboxComponent
    ]
})
export class UIToolkitModule { }
