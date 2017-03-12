import { Component, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UIToolkitModule } from '../../target/main';

@Component({
	selector: 'my-app',
	template: '<h1>Showcase</h1>',
})
export class App {

}


@NgModule({
	imports: [BrowserModule, UIToolkitModule],
	declarations: [App],
	bootstrap: [App]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
	console.log('Bootstrapped successfully');
}, err => {
	console.error(err);
});

console.log('Bootstrapping...');
