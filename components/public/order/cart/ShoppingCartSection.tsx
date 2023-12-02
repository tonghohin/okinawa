"use client";

import { Menu } from "@/schemas/Menu";
import { Order } from "@/schemas/Order";
import useOrderFormDataStore from "@/stores/orderFormDataStore";
import { Tools } from "@/tools/Tools";
import ShoppingCartItem from "./ShoppingCartItem";

interface ShoppingCartSectionProps {
    category: Menu.Categories.Type;
    editable?: boolean;
    preservedOrderFormDataItems?: Order.Items.Frontend.Type;
}

export default function ShoppingCartSection({ category, editable, preservedOrderFormDataItems }: ShoppingCartSectionProps) {
    const orderFormDataItems = preservedOrderFormDataItems || useOrderFormDataStore((state) => state.formData.items);
    const totalByCategory = useOrderFormDataStore((state) => state.getTotalByCategory(category));
    const orderItems = orderFormDataItems[category];

    return (
        !!orderItems?.length && (
            <section className="bg-yellow-400 p-4 flex flex-col gap-4">
                <h1 className="border-b border-yellow-600 flex justify-between">
                    <span>{Menu.Categories.Mapping[category]}</span>
                    <span>Subtotal: ${totalByCategory} </span>
                </h1>
                {orderItems?.map((orderItem, index) => (
                    <ShoppingCartItem key={index} index={index} category={category} orderItem={orderItem} editable={editable}>
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
