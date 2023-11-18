"use client";

import { useOrderFormData, useSetOrderFormData } from "@/contexts/OrderFormContextProvider";
import { Tools } from "@/tools/Tools";
import { MenuCategories } from "@/types/Menu";
import ShoppingCartSnacksItem from "./ShoppingCartSnacksItem";

export default function ShoppingCartSnacksSection() {
    const orderFormData = useOrderFormData();
    const setOrderFormData = useSetOrderFormData();
    const snacksOrderItems = orderFormData?.items.snacks;

    return (
        orderFormData &&
        !!snacksOrderItems?.length && (
            <article className="bg-yellow-400 p-4 flex flex-col gap-4">
                <h1 className="text-lg border-b border-yellow-600 flex justify-between">
                    <span>{MenuCategories.snacks}</span>
                    <span>Subtotal: ${Tools.Frontend.getTotalByCategory(orderFormData, "snacks")} </span>
                </h1>
                {snacksOrderItems?.map((snacksOrderItem, index) => (
                    <ShoppingCartSnacksItem snacksOrderItem={snacksOrderItem} index={index} />
                ))}
            </article>
        )
    );
}
