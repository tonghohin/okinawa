import { MenuCategory, NoodlesItem } from "@/types/Menu";
import { NoodlesOrderItem, Order, OrderItems, RiceOrderItem, SnacksOrderItem } from "@/types/Order";
import { notDeepStrictEqual } from "assert";

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

        export function getTotalByCategory(order: Order.Frontend, category: MenuCategory) {
            let total = 0;
            switch (category) {
                case "rice":
                    for (const item of order.items[category]) {
                        total += getRiceOrderSubtotal(item);
                    }
                    break;
                case "noodles":
                    for (const item of order.items[category]) {
                        total += getNoodlesOrderSubtotal(item);
                    }
                    break;
                case "snacks":
                    for (const item of order.items[category]) {
                        total += getSnacksOrderSubtotal(item);
                    }
                    break;
            }
            return total;
        }

        export function getTotalNumberOfItems(order: Order.Frontend) {
            return order.items.rice.reduce((count, orderItem) => count + orderItem.quantity, 0) + order.items.noodles.reduce((count, orderItem) => count + orderItem.quantity, 0) + order.items.snacks.reduce((count, orderItem) => count + orderItem.quantity, 0);
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

        export function checkOrderExists(existingOrder: Order.Frontend, order: RiceOrderItem.Frontend | NoodlesOrderItem.Frontend | SnacksOrderItem.Frontend, category: MenuCategory) {
            try {
                existingOrder.items[category].forEach((existingRiceOrder, index) => {
                    notDeepStrictEqual(existingRiceOrder, order, String(index));
                });
            } catch (error) {
                return Number((error as Error).message);
            }
            return false;
        }
    }
}
