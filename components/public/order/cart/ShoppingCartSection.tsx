"use client";

import { useOrderFormData } from "@/contexts/OrderFormContextProvider";
import { Tools } from "@/tools/Tools";
import ShoppingCartItem from "./ShoppingCartItem";
import { Menu } from "@/schemas/Menu";

interface ShoppingCartSectionProps {
    category: Menu.Categories.Type;
}

export default function ShoppingCartSection({ category }: ShoppingCartSectionProps) {
    const orderFormData = useOrderFormData();
    const orderItems = orderFormData?.items[category];

    return (
        orderFormData &&
        !!orderItems?.length && (
            <section className="bg-yellow-400 p-4 flex flex-col gap-4">
                <h1 className="text-lg border-b border-yellow-600 flex justify-between">
                    <span>{Menu.Categories.Mapping[category]}</span>
                    <span>Subtotal: ${Tools.Frontend.getTotalByCategory(orderFormData, category)} </span>
                </h1>
                {orderItems?.map((orderItem, index) => (
                    <ShoppingCartItem key={index} index={index} category={category} orderItem={orderItem}>
                        {/* rice */}
                        {"addOn" in orderItem && (
                            <>
                                {orderItem.toUdon && <p className="text-sm">（轉烏冬）</p>}
                                {orderItem.addOn && (
                                    <p className="text-sm">
                                        （轉套餐：{orderItem.addOn.name} ＋${orderItem.addOn.price}）
                                    </p>
                                )}
                            </>
                        )}
                        {/* noodles */}
                        {"addOns" in orderItem && orderItem.addOns.length > 0 && (
                            <p className="text-sm">
                                <span>（{Menu.Noodles.Categories.Mapping.addOn}：</span>
                                {orderItem.addOns.map((addOn, index) => (
                                    <span key={addOn.id}>
                                        {addOn.name}
                                        {index === orderItem.addOns.length - 1 ? "）" : "，"}
                                    </span>
                                ))}
                            </p>
                        )}
                    </ShoppingCartItem>
                ))}
            </section>
        )
    );
}
