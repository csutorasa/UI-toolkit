import { Component, NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { UIToolkitModule } from 'uitoolkit/main';
import { LocalizationService } from 'uitoolkit/localization/LocalizationService';
import { Showcase } from './showcase';
import { routerConfig } from './router';
import { MainMenuComponent } from './menu';

import { LocalizeTestComponent } from './modules/localize';
import { ProgressBarTestComponent } from './modules/progressbar';
import { ButtonTestComponent } from './modules/button';
import { FileUploadTestComponent } from './modules/fileupload';
import { SearchBoxTestComponent } from './modules/searchbox';

const debug = true;

@NgModule({
	imports: [
		BrowserModule,
		UIToolkitModule,
        HttpModule,
		RouterModule.forRoot(routerConfig)
	],
	declarations: [
		Showcase,
		MainMenuComponent,
		LocalizeTestComponent,
		ProgressBarTestComponent,
		ButtonTestComponent,
		FileUploadTestComponent,
		SearchBoxTestComponent
	],
	providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		LocalizationService
	],
	bootstrap: [Showcase]
})
export class ShowcaseModule { }


if(debug) {
	console.debug('Bootstrapping...');
} else {
	enableProdMode();
}
const bootstappingStart = new Date();
platformBrowserDynamic().bootstrapModule(ShowcaseModule).then(() => {
	if(debug) {
		console.debug('Bootstrapped successfully in ' + (new Date().getTime() - bootstappingStart.getTime()) + 'ms');
	}
}, err => {
	console.error(err);
});
