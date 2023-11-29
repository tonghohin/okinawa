import { Menu } from "@/schemas/Menu";
import { Order } from "@/schemas/Order";
import FirestoreService from "@/services/FirestoreService";
import { notDeepStrictEqual } from "assert";

export namespace Tools {
    export namespace Frontend {
        export function getTotal(orderItems: Order.Items.Frontend.Type) {
            let total = 0;
            for (const item of orderItems.rice) {
                total += getOrderSubtotal(item);
            }
            for (const item of orderItems.noodles) {
                total += getOrderSubtotal(item);
            }
            for (const item of orderItems.snacks) {
                total += getOrderSubtotal(item);
            }
            return total;
        }

        export function getTotalByCategory(order: Order.Frontend.Form.Type, category: Menu.Categories.Type) {
            let total = 0;
            switch (category) {
                case "rice":
                    for (const item of order.items[category]) {
                        total += getOrderSubtotal(item);
                    }
                    break;
                case "noodles":
                    for (const item of order.items[category]) {
                        total += getOrderSubtotal(item);
                    }
                    break;
                case "snacks":
                    for (const item of order.items[category]) {
                        total += getOrderSubtotal(item);
                    }
                    break;
            }
            return total;
        }

        export function getTotalNumberOfItems(order: Order.Frontend.Form.Type) {
            return order.items.rice.reduce((count, orderItem) => count + orderItem.quantity, 0) + order.items.noodles.reduce((count, orderItem) => count + orderItem.quantity, 0) + order.items.snacks.reduce((count, orderItem) => count + orderItem.quantity, 0);
        }

        export function getNumberOfItems(orderItems: Order.Items.Frontend.Type, category: Menu.Categories.Type, itemId: string) {
            return orderItems[category].reduce((count, orderItem) => {
                if (orderItem.item.id === itemId) {
                    count += orderItem.quantity;
                }
                return count;
            }, 0);
        }

        export function groupNoodlesAddOnsByPrice(addOns: Menu.Noodles.Item.Type[]) {
            const groups: { [key: number]: Menu.Noodles.Item.Type[] } = {};
            for (const addOn of addOns) {
                if (groups[addOn.price] === undefined) {
                    groups[addOn.price] = [];
                }
                groups[addOn.price].push(addOn);
            }
            return groups;
        }

        export function getEachItemPrice(order: Order.RiceItem.Frontend.Type | Order.NoodlesItem.Frontend.Type | Order.SnacksItem.Frontend.Type) {
            if ("addOn" in order) {
                // rice
                return order.item.price + (order.addOn?.price || 0);
            } else if ("addOns" in order) {
                // noodles
                const addOnsPrice = order.addOns.reduce((total, addOn) => total + addOn.price, 0);
                return order.item.price + addOnsPrice;
            } else {
                // snacks
                return order.item.price;
            }
        }

        export function getOrderSubtotal(order: Order.RiceItem.Frontend.Type | Order.NoodlesItem.Frontend.Type | Order.SnacksItem.Frontend.Type) {
            if ("addOn" in order) {
                // rice
                return (order.item.price + (order.addOn?.price || 0)) * order.quantity;
            } else if ("addOns" in order) {
                // noodles
                const addOnsPrice = order.addOns.reduce((total, addOn) => total + addOn.price, 0);
                return (order.item.price + addOnsPrice) * order.quantity;
            } else {
                // snacks
                return order.item.price * order.quantity;
            }
        }

        export function checkOrderExists(existingOrder: Order.Frontend.Form.Type, order: Order.RiceItem.Frontend.Type | Order.NoodlesItem.Frontend.Type | Order.SnacksItem.Frontend.Type, category: Menu.Categories.Type) {
            try {
                const orderItems = existingOrder.items[category];
                const { item: newOrderItem, quantity, ...newOrderItemFields } = order;
                for (let i = 0; i < orderItems.length; i++) {
                    const { item: existingOrderItem, quantity, ...existingOrderItemFields } = orderItems[i];
                    if (existingOrderItem.id === newOrderItem.id) {
                        notDeepStrictEqual(existingOrderItemFields, newOrderItemFields, String(i));
                    }
                }
                return false;
            } catch (error) {
                return Number((error as Error).message);
            }
        }

        export function transformOrderFormData(orderFormData: Order.Frontend.Form.Type) {
            const transformedFormData: Order.Frontend.Write.Type = {
                ...orderFormData,
                items: {
                    rice: transformRiceOrderFormData(orderFormData.items.rice),
                    noodles: transformNoodlesOrderFormData(orderFormData.items.noodles),
                    snacks: transformSnacksOrderFormData(orderFormData.items.snacks)
                }
            };

            return transformedFormData;
        }

        export function transformRiceOrderFormData(riceOrderFormData: Order.RiceItem.Frontend.Type[]): Order.RiceItem.Type[] {
            return riceOrderFormData.map((riceOrderItem) => {
                return {
                    id: riceOrderItem.item.id,
                    quantity: riceOrderItem.quantity,
                    toUdon: riceOrderItem.toUdon,
                    addOn: riceOrderItem.addOn?.id || null
                };
            });
        }

        export function transformNoodlesOrderFormData(noodlesOrderFormData: Order.NoodlesItem.Frontend.Type[]): Order.NoodlesItem.Type[] {
            return noodlesOrderFormData.map((noodlesOrderItem) => {
                return {
                    id: noodlesOrderItem.item.id,
                    quantity: noodlesOrderItem.quantity,
                    addOns: noodlesOrderItem.addOns.map((addOn) => addOn.id)
                };
            });
        }

        export function transformSnacksOrderFormData(snacksOrderFormData: Order.SnacksItem.Frontend.Type[]): Order.SnacksItem.Type[] {
            return snacksOrderFormData.map((snacksOrderItem) => {
                return {
                    id: snacksOrderItem.item.id,
                    quantity: snacksOrderItem.quantity
                };
            });
        }

        export async function transformOrderFromBackend(orderData: Order.Type[]) {
            const ordersWithJoinedItems = [];

            for (const order of orderData) {
                const joinedItems = Order.Items.Frontend.Schema.parse({
                    rice: [],
                    noodles: [],
                    snacks: []
                });

                for (const riceItem of order.items.rice) {
                    joinedItems.rice.push({
                        item: await FirestoreService.getRiceItemById(riceItem.id),
                        addOn: riceItem.addOn !== null ? await FirestoreService.getRiceItemById(riceItem.addOn) : riceItem.addOn,
                        toUdon: riceItem.toUdon,
                        quantity: riceItem.quantity
                    });
                }
                for (const noodlesItem of order.items.noodles) {
                    joinedItems.noodles.push({
                        item: await FirestoreService.getNoodlesItemById(noodlesItem.id),
                        addOns: await Promise.all(noodlesItem.addOns.map(async (addOn) => await FirestoreService.getNoodlesItemById(addOn))),
                        quantity: noodlesItem.quantity
                    });
                }
                for (const snacksItem of order.items.snacks) {
                    joinedItems.snacks.push({
                        item: await FirestoreService.getSnacksItemById(snacksItem.id),
                        quantity: snacksItem.quantity
                    });
                }
                ordersWithJoinedItems.push({ ...order, items: joinedItems });
            }

            return Order.Frontend.Form.Schema.array().parse(ordersWithJoinedItems);
        }
    }

    export namespace Backend {}
}
