import { Component } from '@angular/core';
import { CreateTesterComponentData } from '../source';
import {  ThemeService } from 'wizyx';

@Component(CreateTesterComponentData('theme'))
export class ThemeTesterComponent { }

@Component({
	selector: 'theme-test',
	template: `
    <button buttonstyle="primary" (click)="changeTheme()">{{ 'blue' | localize }} - {{ 'default' | localize }}</button>
    <button buttonstyle="success" (click)="changeTheme('greentheme')">{{ 'green' | localize }}</button>`,
})
export class ThemeTestComponent {

    constructor(protected themeService: ThemeService) { }

    public changeTheme(theme: string) {
        const path = theme ? theme + '.css' : undefined;
        this.themeService.change(path);
    }
}