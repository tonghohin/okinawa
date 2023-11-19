export namespace General {
    export type Regions = "香港島" | "九龍" | "新界";

    export interface Address {
        region: Regions;
        district: string;
        street: string;
        building: string;
        floor: string;
        flat: string;
    }
}
