"use client";

import Section from "@/components/Section";
import ShoppingCartSection from "@/components/public/order/cart/ShoppingCartSection";
import { useOrderFormData } from "@/contexts/OrderFormContextProvider";
import { useState } from "react";
import EmptyCartModal from "../EmptyCartModal";

export default function ShoppingCart() {
    const orderFormData = useOrderFormData();
    const [isModalOpen, setIsModalOpen] = useState(orderFormData?.total === 0);

    return orderFormData?.total === 0 ? (
        <EmptyCartModal setIsModalOpen={setIsModalOpen} />
    ) : (
        <Section>
            <ShoppingCartSection category="rice" />
            <ShoppingCartSection category="noodles" />
            <ShoppingCartSection category="snacks" />
        </Section>
    );
}
