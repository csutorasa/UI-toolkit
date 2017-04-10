import { Injectable } from '@angular/core';

export const StorageKeys = {
    languageCode: 'languageCode'
};

@Injectable()
export class LocalStorage {
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