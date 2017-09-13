export interface Collection<T> {
    readonly length: number;
    [index: number]: T;
}

export interface Coordinates {
    x: number;
    y: number;
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
    
    public static getPageCoordinates(element: HTMLScriptElement): Coordinates {
        // element.getBoundingClientRect().left is the relative position to the (scrolled) screen
        // window.pageXOffset is the scroll from the left side of the page
        const boundingClientRect: ClientRect = element.getBoundingClientRect();
        return {
            x: boundingClientRect.left + window.pageXOffset,
            y: boundingClientRect.top + window.pageYOffset,
        };
    }

    public static getPageCoordinatesFromRelative(element: HTMLScriptElement, coordinates: Coordinates): Coordinates
    public static getPageCoordinatesFromRelative(element: HTMLScriptElement, x: number, y: number): Coordinates
    public static getPageCoordinatesFromRelative(element: HTMLScriptElement, first: Coordinates | number, second?: number): Coordinates {
        let coordinates: Coordinates;
        if(typeof(first) === 'object') {
            coordinates = <Coordinates>first;
        } else {
            coordinates = { x: <number>first, y: second };
        }
        const elementCoords: Coordinates = Utils.getPageCoordinates(element);
        return {
            x: coordinates.x + elementCoords.x,
            y: coordinates.y + elementCoords.y,
        };
    }

    public static getCoordinateDifference(firstx: number, firsty: number, secondx: number, secondy: number): Coordinates
    public static getCoordinateDifference(first: Coordinates, second: Coordinates): Coordinates
    public static getCoordinateDifference(first: Coordinates | number, second: Coordinates | number, third?: number, forth?: number): Coordinates {
        let a: Coordinates;
        let b: Coordinates;
        if(typeof(first) === 'object') {
            a = <Coordinates>first;
            b = <Coordinates>second;
        } else {
            a = { x: <number>first, y: <number>second };
            b = { x: third, y: forth };
        }
        return {
            x: a.x - b.x,
            y: a.y - b.y
        }
    }
}
