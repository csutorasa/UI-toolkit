export interface Collection<T> {
    readonly length: number;
    [index: number]: T;
}

export class Utils {
    public static collectionToArray<T>(collection: Collection<T>): T[] {
        const array: T[] = [];
        for (let i = 0; i < collection.length; i++) {
            array.push(collection[i]);
        }
        return array;
    }

    public static waterFall(promise: Promise<any>, ...promises: ((value?: any) => any)[]): Promise<any> {
        promises.forEach(p => {
            promise = promise.then(p);
        });
        return promise;
    }

    public static defaultSort<T>(a: T, b: T, selector?: (e: T) => any): number {
        const aVal = selector ? selector(a) : a;
        const bVal = selector ? selector(b) : b;
        if (aVal == null)
            return -1;
        if (bVal == null)
            return 1;
        if (aVal > bVal)
            return 1;
        if (aVal < bVal)
            return -1;
        return 0;
    }

    public static limit(value: number, min: number, max: number): number {
		if (value > max)
			return max;
		else if (value < min)
			return min;
		else
			return value;
    }

    public static numberEquals(a: number, b: number): boolean {
        return Math.abs(a - b) < 0.000001;
    }
}
