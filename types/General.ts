export namespace General {
    export enum Regions {
        hongKongIsland = "香港島",
        kowloon = "九龍",
        newTerritories = "新界"
    }

    export type Region = keyof typeof Regions;

    export interface Address {
        region: Region;
        district: string;
        street: string;
        building: string;
        floor: string;
        flat: string;
    }
}
