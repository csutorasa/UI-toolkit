/**
 * Base class for list-like templating.
 */
export class ListItem {
    /**
     * 
     * @param index index of the item in the list
     * @param count length of the list
     */
    constructor(public index: number, public count: number) {
    }

    public get first(): boolean { return this.index === 0; }

    public get last(): boolean { return this.index === this.count - 1; }

    public get even(): boolean { return this.index % 2 === 0; }

    public get odd(): boolean { return !this.even; }
}