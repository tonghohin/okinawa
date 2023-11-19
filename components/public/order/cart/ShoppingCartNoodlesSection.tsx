"use client";

import { useOrderFormData, useSetOrderFormData } from "@/contexts/OrderFormContextProvider";
import { Tools } from "@/tools/Tools";
import { MenuCategories } from "@/types/Menu";
import ShoppingCartNoodlesItem from "./ShoppingCartNoodlesItem";

export default function ShoppingCartNoodlesSection() {
    const orderFormData = useOrderFormData();
    const setOrderFormData = useSetOrderFormData();
    const noodlesOrderItems = orderFormData?.items.noodles;

    return (
        orderFormData &&
        !!noodlesOrderItems?.length && (
            <article className="bg-yellow-400 p-4 flex flex-col gap-4">
                <h1 className="text-lg border-b border-yellow-600 flex justify-between">
                    <span>{MenuCategories.noodles}</span>
                    <span>Subtotal: ${Tools.Frontend.getTotalByCategory(orderFormData, "noodles")} </span>
                </h1>
                {noodlesOrderItems?.map((noodlesOrderItem, index) => (
                    <ShoppingCartNoodlesItem key={index} noodlesOrderItem={noodlesOrderItem} index={index} />
                ))}
            </article>
        )
    );
}
