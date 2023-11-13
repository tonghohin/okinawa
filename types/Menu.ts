export enum MenuCategories {
    rice = "丼飯",
    snacks = "小食"
}

export enum RiceCategories {
    beef = "牛肉丼",
    pork = "炙燒豚肉丼",
    combo = "豪華二重奏丼",
    eel = "蒲燒鰻魚丼",
    chicken = "照燒烤雞丼",
    curry = "濃厚日式咖哩丼"
}

export type RiceCategory = keyof typeof RiceCategories;

export interface RiceItem {
    id: string;
    category: RiceCategory;
    name: string;
    price: number;
}

export interface SnackItem {
    id: string;
    name: string;
    price: number;
}
