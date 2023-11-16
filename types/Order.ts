export interface RiceOrderItem {
    id: string;
    quantity: number;
    toUdon: boolean;
    addOn: string;
}

export interface NoodlesOrderItem {
    id: string;
    quantity: number;
    main: string;
    addOns: string[];
}

export interface SnacksOrderItem {
    id: string;
    quantity: number;
}

export interface Order {
    id: string;
    name: string;
    email: string;
    phone: string;
    items: {
        rice: RiceOrderItem[];
        noodles: NoodlesOrderItem[];
        snacks: SnacksOrderItem[];
    };
    total: number;
    delivery: boolean;
    address: string;
    date: Date;
    comments: string;
}
