import { Inject, Injectable } from '@angular/core';
import { LocalStorage, StorageKeys } from '../storage/LocalStorage';

export type Translation = { [resource: string]: string};

/**
 * Localizes text.
 */
@Injectable()
export class LocalizationService {
    protected localizeData: Translation;
    protected languageCode: string;

    protected cachedGetLanguages: Promise<string[]>;
    protected cachedGetTranslations: Promise<Translation>;

    protected getLanguagesData: () => Promise<string[]>;
    protected getTranslationData: (language: string) => Promise<Translation>;
    protected formatter: (text: string, params: Object) => string;

    constructor(protected localStorage: LocalStorage) {
        this.languageCode = localStorage.get(StorageKeys.languageCode);
    }

    public config(
        getLanguagesData: () => Promise<string[]>, getTranslationData: (language: string) => Promise<Translation>,
        formatter: (text: string, params: Object) => string = (text: string, params: Object) => text
    ): void {
        this.getLanguagesData = getLanguagesData;
        this.getTranslationData = getTranslationData;
        this.formatter = formatter;
    }

    /**
     * Gets the current language code.
     * @return Language code
     */
    public getLanguageCode(): string {
        return this.languageCode;
    }

    /**
     * Sets the current language code.
     * @return Promise of the task
     */
    public setLanguageCode(code: string): void {
        this.languageCode = code;
        this.cachedGetTranslations = undefined;
        this.localStorage.set(StorageKeys.languageCode, code);
    }

    /**
     * Gets the translations.
     * @param force If the data should be refreshed from server
     * @return Promise of the task
     */
    public getLocalization(force: boolean = false): Promise<Translation> {
        return this.getLanguages().then(() => this.getTranslates(force));
    }

    /**
     * Translates the text from the local data.
     * @param text Text to translate
     * @param params Parameters to format
     * @return Translation
     */
    public translate(resource: string, params?: Object): string {
        const text = this.localizeData[resource];
        return this.formatter(text, params);
    }

    protected getLanguages(): Promise<string[]> {
        if (!this.cachedGetLanguages) {
            this.cachedGetLanguages = this.getLanguagesData()
                .then((response: string[]) => {
                    if(!(response instanceof Array))
                        throw new Error('Invalid mapped languages');
                    if(!this.languageCode) {
                        this.languageCode = response[0];
                    }
                    return response;
                });
        }
        return this.cachedGetLanguages;
    }

    protected getTranslates(force: boolean = false): Promise<Translation> {
        if (!this.cachedGetTranslations || force) {
            this.cachedGetTranslations = this.getTranslationData(this.languageCode)
                .then((response) => {
                    console.log(response);
                    this.localizeData = response;
                    return response;
                });
        }
        return this.cachedGetTranslations;
    }
}
