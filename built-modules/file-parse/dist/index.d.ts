export interface FilterParserConfigArgs<T> {
    read: (fileContents: string) => T;
    write: (obj: T) => string;
}
export declare function makeFilterParsers<T>(config: FilterParserConfigArgs<T>): {
    read: (file: string) => Promise<T>;
    readSync: (file: string) => T;
    write: (file: string, obj: T) => Promise<void>;
    /**
     * @param create If true, will create the file if it doesn't exist
     */
    edit: (file: string, edit: (obj: T) => T, create?: boolean) => Promise<void>;
};
//# sourceMappingURL=index.d.ts.map