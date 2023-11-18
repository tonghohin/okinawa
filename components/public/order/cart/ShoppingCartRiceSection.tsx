"use client";

import { useOrderFormData } from "@/contexts/OrderFormContextProvider";
import { Tools } from "@/tools/Tools";
import { MenuCategories } from "@/types/Menu";
import ShoppingCartRiceItem from "./ShoppingCartRiceItem";

export default function ShoppingCartRiceSection() {
    const orderFormData = useOrderFormData();
    const riceOrderItems = orderFormData?.items.rice;

    return (
        orderFormData &&
        !!riceOrderItems?.length && (
            <article className="bg-yellow-400 p-4 flex flex-col gap-4">
                <h1 className="text-lg border-b border-yellow-600 flex justify-between">
                    <span>{MenuCategories.rice}</span>
                    <span>Subtotal: ${Tools.Frontend.getTotalByCategory(orderFormData, "rice")} </span>
                </h1>
                {riceOrderItems?.map((riceOrderItem, index) => (
                    <ShoppingCartRiceItem key={index} riceOrderItem={riceOrderItem} index={index} />
                ))}
            </article>
        )
    );
}
