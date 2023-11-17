export interface RiceOrderItem {
    id: string;
    quantity: number;
    toUdon: boolean;
    addOn: string;
    subTotal: number;
}

export interface NoodlesOrderItem {
    id: string;
    quantity: number;
    main: string;
    addOns: string[];
    subTotal: number;
}

export interface SnacksOrderItem {
    id: string;
    quantity: number;
    subTotal: number;
}

export interface OrderItems {
    rice: RiceOrderItem[];
    noodles: NoodlesOrderItem[];
    snacks: SnacksOrderItem[];
}

export interface Order {
    id: string;
    name: string;
    email: string;
    phone: string;
    items: OrderItems;
    total: number;
    delivery: boolean;
    address: string;
    date: Date;
    comments: string;
}
