
export interface Storage {
    /**
     * Clears all stored data.
     */
    clear(): void;

    /**
     * Gets the data with the given key.
     * @param key key to the data
     * @return contained value
     */
    get(key: string): string;

    /**
     * Sets the data with the given key.
     * @param key key to the data
     * @param value new value
     */
    set(key: string, value: string): void;

    /**
     * Removes the data with the given key.
     * @param key key to the data
     */
    remove(key: string): void;
}
