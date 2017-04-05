export interface Collection<T> {
    readonly length: number;
    [index: number]: T;
}

export class Utils {
    /**
     * Converts collection to native array.
     * @param collection collection to convert
     */
    public static collectionToArray<T>(collection: Collection<T>): T[] {
        const array: T[] = [];
        for (let i = 0; i < collection.length; i++) {
            array.push(collection[i]);
        }
        return array;
    }

    /**
     * Creates a sequence from promises or functions.
     * @param promise promise to start with
     * @param promises promises or function to complete
     */
    public static waterFall(promise: Promise<any>, ...promises: ((value?: any) => any)[]): Promise<any> {
        promises.forEach(p => {
            promise = promise.then(p);
        });
        return promise;
    }

    /**
     * Built-in comparer function wrapper.
     * @param a first item
     * @param b second item
     */
    public static defaultSort<T>(a: T, b: T): number {
        if (a == null)
            return -1;
        if (b == null)
            return 1;
        if (a > b)
            return 1;
        if (a < b)
            return -1;
        return 0;
    }

    /**
     * Limit a numeric value between bounds.
     * @param value value to limit
     * @param min lower bound
     * @param max higher bound
     */
    public static limit(value: number, min: number, max: number): number {
		if (value > max)
			return max;
		else if (value < min)
			return min;
		else
			return value;
    }

    /**
     * Checks if the two numbers are equal (even for floating point values).
     * @param a first number
     * @param b second number
     */
    public static numberEquals(a: number, b: number): boolean {
        return Math.abs(a - b) < 0.000001;
    }
}
