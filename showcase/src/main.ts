import { Component, NgModule } from '@angular/core';
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
		LocalizeTestComponent
	],
	providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		LocalizationService
	]
	bootstrap: [Showcase]
})
export class ShowcaseModule { }

console.log('Bootstrapping...');
platformBrowserDynamic().bootstrapModule(ShowcaseModule).then(() => {
	console.log('Bootstrapped successfully');
}, err => {
	console.error(err);
});
