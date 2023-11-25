"use client";

import Section from "@/components/Section";
import ShoppingCartSection from "@/components/public/order/cart/ShoppingCartSection";
import { useOrderFormData, useSetOrderFormData } from "@/contexts/public/OrderFormContextProvider";
import { Order } from "@/schemas/Order";
import { useEffect, useRef } from "react";
import EmptyCartModal from "../EmptyCartModal";

export default function OrderDetails() {
    const orderFormData = useOrderFormData();
    const setOrderFormData = useSetOrderFormData();
    const preservedOrderFormData = useRef(orderFormData);

    useEffect(() => setOrderFormData?.(Order.Frontend.Form.State), []);

    return preservedOrderFormData?.current?.total === 0 ? (
        <EmptyCartModal />
    ) : (
        <div className="rounded border p-4 border-yellow-600 self-stretch">
            <Section noGap>
                <h1 className="text-lg text-center underline">Total ${preservedOrderFormData?.current?.total}</h1>
                <ShoppingCartSection category="rice" preservedOrderFormData={preservedOrderFormData?.current} />
                <ShoppingCartSection category="noodles" preservedOrderFormData={preservedOrderFormData?.current} />
                <ShoppingCartSection category="snacks" preservedOrderFormData={preservedOrderFormData?.current} />
            </Section>
        </div>
    );
}
