import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Cache } from './storage/Cache';
import { LocalStorage } from './storage/LocalStorage';

import { LocalizationPipe } from './localization/LocalizationPipe';
import { LocalizationResolver } from './localization/LocalizationResolver';
import { LocalizationService } from './localization/LocalizationService';

@NgModule({
    imports: [BrowserModule],
    providers: [ 
        Cache,
        LocalizationService,
        LocalizationResolver,
        LocalStorage
    ],
    declarations: [
        LocalizationPipe
    ],
    exports: [
        LocalizationPipe
    ]
})
export class UIToolkitModule { }
