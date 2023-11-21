import { Menu } from "@/schemas/Menu";
import { Order } from "@/schemas/Order";

export namespace InitialStates {
    export const Order: Order.Frontend.Type = {
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

    export const RiceOrderItem = (riceItem: Menu.Rice.Item.Type): Order.RiceItem.Frontend.Type => ({
        item: riceItem,
        quantity: 0,
        toUdon: false
    });

    export const NoodlesOrderItem = (noodlesItem: Menu.Noodles.Item.Type): Order.NoodlesItem.Frontend.Type => ({
        item: noodlesItem,
        quantity: 0,
        addOns: []
    });

    export const SnacksOrderItem = (snackItem: Menu.Snacks.Item.Type): Order.SnacksItem.Frontend.Type => ({
        item: snackItem,
        quantity: 0
    });
}
