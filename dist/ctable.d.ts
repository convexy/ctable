type DataType = "string" | "int" | "number" | "date" | "time" | "datetime";
export declare class CTableColumn {
    readonly physicalName: string;
    readonly name: string;
    readonly dataType: DataType;
    readonly onlyHalfWidthCharacter: boolean;
    private hidden;
    digits: number | null;
    constructor(phyiscalName: string, name: string, dataType: DataType, options?: {
        digits?: number;
        onlyHalfWidthCharacter?: boolean;
        hidden?: boolean;
    });
}
export declare class CTable {
    private id;
    private table;
    private tbody;
    private columns;
    readonly data: {
        [key: string]: string | number | Date | null;
    }[];
    private selectedArea;
    constructor(tableElement: HTMLElement | HTMLTableElement | null, columns: CTableColumn[], options?: {
        caption?: string;
        displayRowNumber?: boolean;
    });
    addData(data: {
        [key: string]: string | number | Date | null;
    }[]): void;
    clearData(): void;
    resetData(data: {
        [key: string]: string | number | Date | null;
    }[]): void;
}
export {};
