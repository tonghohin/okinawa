export interface Item {
    id: string;
    name: string;
    price: number;
}

export interface RiceMenu {
    beef: Item[];
    pork: Item[];
    combo: Item[];
    eel: Item[];
    chicken: Item[];
    curry: Item[];
}

export type RiceMenuKeys = keyof RiceMenu;
