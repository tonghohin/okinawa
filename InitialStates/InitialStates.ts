import { NoodlesItem, RiceItem, SnacksItem } from "@/types/Menu";
import { NoodlesOrderItem, Order, RiceOrderItem, SnacksOrderItem } from "@/types/Order";

export namespace InitialStates {
    export const Order: Order.Frontend = {
        name: "",
        email: "",
        phone: "",
        items: {
            rice: [],
            noodles: [],
            snacks: []
        },
        total: 0,
        delivery: false,
        address: {
            region: "香港島",
            district: "",
            street: "",
            building: "",
            floor: "",
            flat: ""
        },
        date: new Date(),
        comments: "",
        delivered: false
    };

    export const RiceOrderItem = (riceItem: RiceItem): RiceOrderItem.Frontend => ({
        item: riceItem,
        quantity: 0,
        toUdon: false,
        addOn: null
    });

    export const NoodlesOrderItem = (noodlesItem: NoodlesItem): NoodlesOrderItem.Frontend => ({
        item: noodlesItem,
        quantity: 0,
        addOns: []
    });

    export const SnacksOrderItem = (snackItem: SnacksItem): SnacksOrderItem.Frontend => ({
        item: snackItem,
        quantity: 0
    });
}
