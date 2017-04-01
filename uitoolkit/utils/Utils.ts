export interface Collection<T> {
    readonly length: number;
    [index: number]: T;
}

export class Utils {
    public static CollectionToArray<T>(collection: Collection<T>): T[] {
        const array: T[] = [];
        for(let i = 0; i < collection.length; i++) {
            array.push(collection[i]);
        }
        return array;
    }
}
