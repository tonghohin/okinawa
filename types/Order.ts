export interface OrderItem {
    id: string;
    quantity: number;
}

export interface Order {
    id: string;
    name: string;
    email: string;
    phone: string;
    items: OrderItem[];
    total: number;
    delivery: boolean;
    date: Date;
    comments: string;
}
