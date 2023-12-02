"use client";

import Section from "@/components/Section";
import ShoppingCartSection from "@/components/public/order/cart/ShoppingCartSection";
import useOrderFormDataStore from "@/stores/orderFormDataStore";
import EmptyCartModal from "../EmptyCartModal";

export default function ShoppingCart() {
    const orderFormData = useOrderFormDataStore((state) => state.formData);

    return orderFormData?.total === 0 ? (
        <EmptyCartModal />
    ) : (
        <Section>
            <ShoppingCartSection category="rice" editable />
            <ShoppingCartSection category="noodles" editable />
            <ShoppingCartSection category="snacks" editable />
        </Section>
    );
}
