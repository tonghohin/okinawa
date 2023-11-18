import { MenuCategory, NoodlesItem } from "@/types/Menu";
import { NoodlesOrderItem, Order, OrderItems, RiceOrderItem, SnacksOrderItem } from "@/types/Order";

export namespace Tools {
    export namespace Frontend {
        export function getTotal(orderItems: OrderItems.Frontend) {
            let total = 0;
            for (const item of orderItems.rice) {
                total += getRiceOrderSubtotal(item);
            }
            for (const item of orderItems.noodles) {
                total += getNoodlesOrderSubtotal(item);
            }
            for (const item of orderItems.snacks) {
                total += getSnacksOrderSubtotal(item);
            }
            return total;
        }

        export function getTotalByCategory(orderItems: Order.Frontend, category: MenuCategory) {
            let total = 0;
            switch (category) {
                case "rice":
                    for (const item of orderItems.items[category]) {
                        total += getRiceOrderSubtotal(item);
                    }
                    break;
                case "noodles":
                    for (const item of orderItems.items[category]) {
                        total += getNoodlesOrderSubtotal(item);
                    }
                    break;
                case "snacks":
                    for (const item of orderItems.items[category]) {
                        total += getSnacksOrderSubtotal(item);
                    }
                    break;
            }
            return total;
        }

        export function getNumberOfItems(orderItems: OrderItems.Frontend, category: MenuCategory, itemId: string) {
            return orderItems[category].reduce((count, orderItem) => {
                if (orderItem.item.id === itemId) {
                    count += orderItem.quantity;
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

        export function getRiceOrderSubtotal(riceOrder: RiceOrderItem.Frontend) {
            return (riceOrder.item.price + (riceOrder.addOn?.price || 0)) * riceOrder.quantity;
        }

        export function getNoodlesOrderSubtotal(noodlesOrder: NoodlesOrderItem.Frontend) {
            const addOnsPrice = noodlesOrder.addOns.reduce((total, addOn) => total + addOn.price, 0);
            return (noodlesOrder.item.price + addOnsPrice) * noodlesOrder.quantity;
        }

        export function getSnacksOrderSubtotal(snackOrder: SnacksOrderItem.Frontend) {
            return snackOrder.item.price * snackOrder.quantity;
        }
    }
}
