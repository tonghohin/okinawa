"use client";

import Section from "@/components/Section";
import ShoppingCartSection from "@/components/public/order/cart/ShoppingCartSection";
import useOrderFormDataStore from "@/stores/orderFormDataStore";
import { useEffect, useRef } from "react";
import EmptyCartModal from "../EmptyCartModal";

export default function OrderDetails() {
    const orderFormDataTotal = useOrderFormDataStore((state) => state.formData.total);
    const orderFormDataItems = useOrderFormDataStore((state) => state.formData.items);
    const resetFormData = useOrderFormDataStore((state) => state.resetFormData);
    const preservedOrderFormDataItems = useRef(orderFormDataItems);
    const preservedOrderFormDataTotal = useRef(orderFormDataTotal);

    useEffect(() => resetFormData(), []);

    return preservedOrderFormDataTotal?.current === 0 ? (
        <EmptyCartModal />
    ) : (
        <div className="rounded border p-4 border-yellow-600 self-stretch">
            <Section noGap>
                <h1 className="text-lg text-center underline">Total ${preservedOrderFormDataTotal.current}</h1>
                <ShoppingCartSection category="rice" preservedOrderFormDataItems={preservedOrderFormDataItems.current} />
                <ShoppingCartSection category="noodles" preservedOrderFormDataItems={preservedOrderFormDataItems.current} />
                <ShoppingCartSection category="snacks" preservedOrderFormDataItems={preservedOrderFormDataItems.current} />
            </Section>
        </div>
    );
}
