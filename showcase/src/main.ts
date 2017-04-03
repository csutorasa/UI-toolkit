import { Component, NgModule, enableProdMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { SourceComponent } from './source';

import { LocalizeTesterComponent, LocalizeTestComponent } from './modules/localize';
import { ProgressBarTesterComponent, ProgressBarTestComponent } from './modules/progressbar';
import { SliderTesterComponent, SliderTestComponent } from './modules/slider';
import { DragAndDropTesterComponent, DragAndDropTestComponent } from './modules/draganddrop';
import { ButtonTesterComponent, ButtonTestComponent } from './modules/button';
import { FileUploadTesterComponent, FileUploadTestComponent } from './modules/fileupload';
import { SearchBoxTesterComponent, SearchBoxTestComponent } from './modules/searchbox';
import { DataGridTesterComponent, DataGridTestComponent } from './modules/datagrid';

const debug = true;

@NgModule({
	imports: [
		BrowserModule,
		UIToolkitModule,
		HttpModule,
		FormsModule,
		RouterModule.forRoot(routerConfig)
	],
	declarations: [
		Showcase,
		SourceComponent,
		MainMenuComponent,
		LocalizeTesterComponent,
		LocalizeTestComponent,
		ProgressBarTesterComponent,
		ProgressBarTestComponent,
		SliderTestComponent,
		SliderTesterComponent,
		DragAndDropTesterComponent,
		DragAndDropTestComponent,
		ButtonTesterComponent,
		ButtonTestComponent,
		FileUploadTesterComponent,
		FileUploadTestComponent,
		SearchBoxTesterComponent,
		SearchBoxTestComponent,
		DataGridTesterComponent,
		DataGridTestComponent
	],
	providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		LocalizationService
	],
	bootstrap: [Showcase]
})
export class ShowcaseModule { }


if (debug) {
	console.debug('Bootstrapping...');
} else {
	enableProdMode();
}
const bootstappingStart = new Date();
platformBrowserDynamic().bootstrapModule(ShowcaseModule).then(() => {
	if (debug) {
		console.debug('Bootstrapped successfully in ' + (new Date().getTime() - bootstappingStart.getTime()) + 'ms');
	}
}, err => {
	console.error(err);
});
