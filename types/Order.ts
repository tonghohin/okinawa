import { General } from "./General";
import { NoodlesItem, RiceItem, SnacksItem } from "./Menu";

export namespace RiceOrderItem {
    export interface Frontend {
        item: RiceItem;
        quantity: number;
        toUdon: boolean;
        addOn: RiceItem | null;
    }

    export interface Backend {
        id: string;
        quantity: number;
        toUdon: boolean;
        addOn: string | null;
    }
}

export namespace NoodlesOrderItem {
    export interface Frontend {
        item: NoodlesItem;
        quantity: number;
        addOns: NoodlesItem[];
    }

    export interface Backend {
        id: string;
        quantity: number;
        addOns: string[];
    }
}

export namespace SnacksOrderItem {
    export interface Frontend {
        item: SnacksItem;
        quantity: number;
    }

    export interface Backend {
        id: string;
        quantity: number;
    }
}

export namespace OrderItems {
    export interface Frontend {
        rice: RiceOrderItem.Frontend[];
        noodles: NoodlesOrderItem.Frontend[];
        snacks: SnacksOrderItem.Frontend[];
    }

    export interface Backend {
        rice: RiceOrderItem.Backend[];
        noodles: NoodlesOrderItem.Backend[];
        snacks: SnacksOrderItem.Backend[];
    }
}

export namespace Order {
    export interface Frontend {
        name: string;
        email: string;
        phone: string;
        items: OrderItems.Frontend;
        total: number;
        delivery: boolean;
        address?: General.Address;
        date: Date;
        comments: string;
    }

    export namespace Backend {
        export interface Write {
            name: string;
            email: string;
            phone: string;
            items: OrderItems.Backend;
            total: number;
            delivery: boolean;
            address?: General.Address;
            date: Date;
            comments: string;
        }

        export interface Read {
            id: string;
            name: string;
            email: string;
            phone: string;
            items: OrderItems.Backend;
            total: number;
            delivery: boolean;
            address?: General.Address;
            date: Date;
            comments: string;
        }
    }
}
