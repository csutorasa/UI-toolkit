import { Injectable } from '@angular/core';
import { Storage } from './Storage';

export const StorageKeys = {
    languageCode: 'languageCode'
};

@Injectable()
export class LocalStorage implements Storage {
    public clear(): void {
        localStorage.clear();
    }

    public get(key: string): string {
        return localStorage.getItem(key);
    }

    public set(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    public remove(key: string): void {
        localStorage.removeItem(key);
    }
}