export interface RiceOrderItem {
    id: string;
    quantity: number;
    udon: boolean;
    addOn: string;
}

export interface NoodlesOrderItem {
    id: string;
    main: string;
    addOns: string[];
    quantity: number;
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
        noodles: RiceOrderItem[];
        snacks: SnacksOrderItem[];
    };
    total: number;
    delivery: boolean;
    address: string;
    date: Date;
    comments: string;
}
