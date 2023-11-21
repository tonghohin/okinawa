"use client";

import ChipLink from "@/components/ChipLink";
import Modal from "@/components/Modal";
import Section from "@/components/Section";
import ShoppingCartSection from "@/components/public/order/cart/ShoppingCartSection";
import { useOrderFormData } from "@/contexts/OrderFormContextProvider";
import emptyCart from "@/public/emptyCart.svg";
import Image from "next/image";
import { useState } from "react";

export default function ShoppingCart() {
    const orderFormData = useOrderFormData();
    const [isModalOpen, setIsModalOpen] = useState(orderFormData?.total === 0);

    return orderFormData?.total === 0 ? (
        <Modal setIsModalOpen={setIsModalOpen}>
            <span>你個購物車空嘅！</span>
            <span>快d去落order！</span>
            <Image src={emptyCart} width={300} height={200} alt="Empty Cart" priority />
            <ChipLink href="/order" className="bg-yellow-500">
                落Order
            </ChipLink>
        </Modal>
    ) : (
        <Section>
            <ShoppingCartSection category="rice" />
            <ShoppingCartSection category="noodles" />
            <ShoppingCartSection category="snacks" />
        </Section>
    );
}
