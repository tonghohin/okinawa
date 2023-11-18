import { MenuCategory, NoodlesItem, RiceItem, SnacksItem } from "@/types/Menu";
import { NoodlesOrderItem, OrderItems, RiceOrderItem, SnacksOrderItem } from "@/types/Order";

export namespace Tools {
    export function getTotal(orderItems: OrderItems) {
        let total = 0;
        for (const item of orderItems.rice) {
            total += item.subTotal;
        }
        for (const item of orderItems.noodles) {
            total += item.subTotal;
        }
        for (const item of orderItems.snacks) {
            total += item.subTotal;
        }
        return total;
    }

    export function getNumberOfItems(orderItems: OrderItems, category: MenuCategory, itemId: string) {
        return orderItems[category].reduce((count, item) => {
            if (item.id === itemId) {
                count += item.quantity;
            }
            return count;
        }, 0);
    }

    export function groupNoodlesAddOnsByPrice(addOns: NoodlesItem[]) {
        const groups: { [key: number]: NoodlesItem[] } = {};
        for (const addOn of addOns) {
            if (groups[addOn.price] === undefined) {
                groups[addOn.price] = [];
            }
            groups[addOn.price].push(addOn);
        }
        return groups;
    }

    export function getRiceOrderSubtotal(riceOrder: RiceOrderItem, rice: RiceItem, addOns: RiceItem[]) {
        const addOnPrice = addOns.find((addOn) => addOn.id === riceOrder.addOn)?.price || 0;
        return (rice.price + addOnPrice) * riceOrder.quantity;
    }

    export function getNoodlesOrderSubtotal(noodlesOrder: NoodlesOrderItem, noodles: NoodlesItem, addOns: NoodlesItem[]) {
        const addOnsPrice = noodlesOrder.addOns.reduce((total, addOnId) => total + (addOns.find((addOn) => addOn.id === addOnId)?.price || 0), 0);
        return (noodles.price + addOnsPrice) * noodlesOrder.quantity;
    }

    export function getSnacksOrderSubtotal(snackOrder: SnacksOrderItem, snack: SnacksItem) {
        return snack.price * snackOrder.quantity;
    }
}
