import { NoodlesOrderItem, Order, RiceOrderItem, SnacksOrderItem } from "@/types/Order";

export namespace InitialStates {
    export const Order: Order = {
        id: "",
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
        address: "",
        date: new Date(),
        comments: ""
    };

    export const RiceOrderItem = (riceId: string): RiceOrderItem => ({
        id: riceId,
        quantity: 0,
        toUdon: false,
        addOn: "",
        subTotal: 0
    });

    export const NoodlesOrderItem = (noodleId: string): NoodlesOrderItem => ({
        id: noodleId,
        quantity: 0,
        addOns: [],
        subTotal: 0
    });

    export const SnacksOrderItem = (snackId: string): SnacksOrderItem => ({
        id: snackId,
        quantity: 0,
        subTotal: 0
    });
}
