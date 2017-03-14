import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LocalizationPipe } from './localization/LocalizationPipe';
import { LocalizationResolver } from './localization/LocalizationResolver';
import { LocalizationService } from './localization/LocalizationService';

import { ProgressBarComponent } from './progressbar/ProgressBarComponent';

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
        ProgressBarComponent
    ],
    exports: [
        LocalizationPipe,
        ProgressBarComponent
    ]
})
export class UIToolkitModule { }
