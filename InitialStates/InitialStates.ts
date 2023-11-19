import { NoodlesItem, RiceItem, SnacksItem } from "@/types/Menu";
import { NoodlesOrderItem, Order, RiceOrderItem, SnacksOrderItem } from "@/types/Order";

export namespace InitialStates {
    export const Order: Order.Frontend = {
        id: "",
        name: "",
        email: "",
        phone: "",
        items: {
            rice: [
                { item: { id: "neAkunm6zMmhto4abtfs", category: "beef", name: "和風牛肉丼", price: 58 }, quantity: 2, toUdon: true, addOn: { id: "rs0m4u4ar87bq3VNOHdg", category: "addOn", name: "清新胡麻沙律", price: 15 } },
                { item: { id: "neAkunm6zMmhto4abtfs", category: "beef", name: "和風牛肉丼", price: 58 }, quantity: 2, toUdon: true, addOn: { id: "rs0m4u4ar87bq3VNOHdg", category: "addOn", name: "清新胡麻沙律", price: 15 } },
                { item: { id: "neAkunm6zMmhto4abtfs", category: "beef", name: "和風牛肉丼", price: 58 }, quantity: 2, toUdon: true, addOn: { id: "rs0m4u4ar87bq3VNOHdg", category: "addOn", name: "清新胡麻沙律", price: 15 } },
                { item: { id: "neAkunm6zMmhto4abtfs", category: "beef", name: "和風牛肉丼", price: 58 }, quantity: 2, toUdon: true, addOn: null },
                { item: { id: "neAkunm6zMmhto4abtfs", category: "beef", name: "和風牛肉丼", price: 58 }, quantity: 2, toUdon: false, addOn: { id: "rs0m4u4ar87bq3VNOHdg", category: "addOn", name: "清新胡麻沙律", price: 15 } },
                { item: { id: "neAkunm6zMmhto4abtfs", category: "beef", name: "和風牛肉丼", price: 58 }, quantity: 2, toUdon: true, addOn: { id: "rs0m4u4ar87bq3VNOHdg", category: "addOn", name: "清新胡麻沙律", price: 15 } },
                { item: { id: "neAkunm6zMmhto4abtfs", category: "beef", name: "和風牛肉丼", price: 58 }, quantity: 2, toUdon: true, addOn: { id: "rs0m4u4ar87bq3VNOHdg", category: "addOn", name: "清新胡麻沙律", price: 15 } },
                { item: { id: "neAkunm6zMmhto4abtfs", category: "beef", name: "和風牛肉丼", price: 58 }, quantity: 1, toUdon: false, addOn: null }
            ],
            noodles: [
                {
                    item: { id: "7mRv4d043ug8rTC8wgtk", category: "main", name: "稻庭真打鳥冬", price: 15, minimumAddOns: 3 },
                    quantity: 1,
                    addOns: [
                        { id: "hKamOhwMn1WaQWWP24wX", category: "addOn", name: "照燒雞肉", price: 16 },
                        { id: "wU6K3DqC5I46P496rtYo", category: "addOn", name: "帶子餅", price: 16 },
                        { id: "wU6K3DqC5I46P496rtYo", category: "addOn", name: "帶子餅", price: 16 },
                        { id: "wU6K3DqC5I46P496rtYo", category: "addOn", name: "帶子餅", price: 16 },
                        { id: "wU6K3DqC5I46P496rtYo", category: "addOn", name: "帶子餅", price: 16 },
                        { id: "wU6K3DqC5I46P496rtYo", category: "addOn", name: "帶子餅", price: 16 },
                        { id: "wU6K3DqC5I46P496rtYo", category: "addOn", name: "帶子餅", price: 16 },
                        { id: "y9gddnsM9hPXGIgsoNhA", category: "addOn", name: "和風牛肉", price: 16 }
                    ]
                }
            ],
            snacks: [{ item: { id: "0xBKc9BXFuXhdQ5k1yvL", name: "日本南瓜可樂餅", price: 20 }, quantity: 2 }]
        },
        total: 176,
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
        comments: ""
    };
    // {
    //     id: "",
    //     name: "",
    //     email: "",
    //     phone: "",
    //     items: {
    //         rice: [],
    //         noodles: [],
    //         snacks: []
    //     },
    //     total: 0,
    //     delivery: false,
    //     address: "",
    //     date: new Date(),
    //     comments: ""
    // };

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
