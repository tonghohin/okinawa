"use client";

import Section from "@/components/Section";
import ShoppingCartSection from "@/components/public/order/cart/ShoppingCartSection";
import useOrderFormDataStore from "@/stores/orderFormDataStore";
import EmptyCartModal from "../EmptyCartModal";

export default function ShoppingCart() {
    const orderFormDataTotal = useOrderFormDataStore((state) => state.formData.total);

    return orderFormDataTotal === 0 ? (
        <EmptyCartModal />
    ) : (
        <Section>
            <ShoppingCartSection category="rice" editable />
            <ShoppingCartSection category="noodles" editable />
            <ShoppingCartSection category="snacks" editable />
        </Section>
    );
}
