import { MenuCategory } from "@/types/Menu";
import { OrderItems } from "@/types/Order";

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
}
