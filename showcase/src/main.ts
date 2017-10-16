import { Component, NgModule, enableProdMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { WizyxModule } from 'wizyx';
import { LocalizationService, DragAndDropService } from 'wizyx';
import { Showcase } from './showcase';
import { routerConfig } from './router';
import { MainMenuComponent } from './menu';
import { SourceComponent } from './source';

import { LocalizeTesterComponent, LocalizeTestComponent } from './modules/localize';
import { ProgressBarTesterComponent, ProgressBarTestComponent } from './modules/progressbar';
import { SliderTesterComponent, SliderTestComponent } from './modules/slider';
import { DragAndDropTesterComponent, DragAndDropTestComponent } from './modules/draganddrop';
import { ButtonTesterComponent, ButtonTestComponent } from './modules/button';
import { ExpanderTesterComponent, ExpanderTestComponent } from './modules/expander';
import { FileUploadTesterComponent, FileUploadTestComponent } from './modules/fileupload';
import { SearchBoxTesterComponent, SearchBoxTestComponent } from './modules/searchbox';
import { DataGridTesterComponent, DataGridTestComponent } from './modules/datagrid';
import { ThemeTesterComponent, ThemeTestComponent } from './modules/theme';

const debug = true;

@NgModule({
	imports: [
		BrowserModule,
		WizyxModule,
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
		ExpanderTesterComponent,
		ExpanderTestComponent,
		FileUploadTesterComponent,
		FileUploadTestComponent,
		SearchBoxTesterComponent,
		SearchBoxTestComponent,
		DataGridTesterComponent,
		DataGridTestComponent,
		ThemeTesterComponent,
		ThemeTestComponent
	],
	providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		LocalizationService,
		DragAndDropService
	],
	bootstrap: [Showcase]
})
export class ShowcaseModule { }

window.onload = () => {
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
}
