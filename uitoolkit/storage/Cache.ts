import { Injectable } from '@angular/core';

@Injectable()
export class Cache {
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