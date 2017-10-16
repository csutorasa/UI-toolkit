import { Injectable } from '@angular/core';
import { LocalStorage, StorageKeys } from '../storage/LocalStorage';

@Injectable()
export class ThemeService {

    protected readonly linkElement: HTMLLinkElement;
    protected active: boolean = false;

    constructor(protected localStorage: LocalStorage) {
        this.linkElement = document.createElement("link");
        this.linkElement.rel = 'stylesheet';
    }

    /**
     * Restores the previous state of the theme.
     */
    public restore(): void {
        this.change(this.localStorage.get(StorageKeys.theme));
    }

    /**
     * Changes the current theme.
     * @param themeUrl path to the theme CSS file
     */
    public change(themeUrl: string): void { 
        if(themeUrl) {
            if(!this.active) {
                document.head.appendChild(this.linkElement);
                this.active = true;
            }
            this.linkElement.href = themeUrl;
            this.localStorage.set(StorageKeys.theme, themeUrl);
        } else if(this.active) {
            document.head.removeChild(this.linkElement);
            this.active = false;
            this.localStorage.set(StorageKeys.theme, '');
        }
    }
}