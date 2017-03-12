import { Component, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UIToolkitModule } from '../target/main';

@Component({
	selector: 'my-app',
	template: '<p>Test</p>',
})
export class App {

}


@NgModule({
	imports: [BrowserModule, UIToolkitModule],
	declarations: [App],
	bootstrap: [App]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)

console.log('ASD')
