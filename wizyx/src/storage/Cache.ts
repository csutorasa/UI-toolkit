import { Injectable } from '@angular/core';
import { Storage } from './Storage';

/**
 * Store for the current session.
 */
@Injectable()
export class Cache implements Storage {
    protected data: Object = {};

    public clear(): void {
        for(let key in this.data) {
            delete this.data[key];
        }
    }

    public get<T>(key: string): T {
        return <T>this.data[key];
    }

    public set<T>(key: string, value: T): void {
        this.data[key] = value;
    }

    public remove(key: string): void {
        delete this.data[key];
    }
}