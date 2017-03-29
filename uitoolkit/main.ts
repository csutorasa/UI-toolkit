import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LocalizationPipe } from './localization/LocalizationPipe';
import { LocalizationResolver } from './localization/LocalizationResolver';
import { LocalizationService } from './localization/LocalizationService';

import { ProgressBarComponent } from './progressbar/ProgressBarComponent';

import { ButtonDirective } from './button/ButtonDirective';

import { FileUploaderComponent } from './fileuploader/FileuploaderComponent';

import { SearchboxComponent } from './searchbox/SearchboxComponent';

import { Cache } from './storage/Cache';
import { LocalStorage } from './storage/LocalStorage';

@NgModule({
    imports: [BrowserModule],
    providers: [ 
        Cache,
        LocalizationService,
        LocalizationResolver,
        LocalStorage
    ],
    declarations: [
        LocalizationPipe,
        ProgressBarComponent,
        ButtonDirective,
        FileUploaderComponent,
        SearchboxComponent
    ],
    exports: [
        LocalizationPipe,
        ProgressBarComponent,
        ButtonDirective,
        FileUploaderComponent,
        SearchboxComponent
    ]
})
export class UIToolkitModule { }
