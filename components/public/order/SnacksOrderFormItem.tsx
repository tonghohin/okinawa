"use client";

import BigCircleButton from "@/components/BigCircleButton";
import ChipButton from "@/components/ChipButton";
import Modal from "@/components/Modal";
import Section from "@/components/Section";
import { useOrderFormData, useSetOrderFormData } from "@/contexts/public/OrderFormContextProvider";
import { Menu } from "@/schemas/Menu";
import { Order } from "@/schemas/Order";
import { Tools } from "@/tools/Tools";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import OrderFormItem from "./OrderFormItem";

interface SnacksOrderFormItemProps {
    snack: Menu.Snacks.Item.Type;
}

export default function SnacksOrderFormItem({ snack }: SnacksOrderFormItemProps) {
    const orderFormData = useOrderFormData();
    const setOrderFormData = useSetOrderFormData();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [snacksOrderFormData, setSnacksOrderFormData] = useState<Order.SnacksItem.Frontend.Type>(Order.SnacksItem.Frontend.State(snack));

    const isValidOrder = snacksOrderFormData.quantity > 0;

    function handleQuantityChange(increment: boolean) {
        if (increment) {
            setSnacksOrderFormData((prevSnacksOrderFromData) => ({ ...prevSnacksOrderFromData, quantity: prevSnacksOrderFromData.quantity + 1 }));
        } else {
            setSnacksOrderFormData((prevSnacksOrderFromData) => {
                return prevSnacksOrderFromData.quantity > 0 ? { ...prevSnacksOrderFromData, quantity: prevSnacksOrderFromData.quantity - 1 } : prevSnacksOrderFromData;
            });
        }
    }

    function handleAddToCart() {
        if (snacksOrderFormData.quantity > 0) {
            if (orderFormData && setOrderFormData) {
                const isSameOrderExists = Tools.Frontend.checkOrderExists(orderFormData, snacksOrderFormData, "snacks");

                setOrderFormData((prevOrderFormData) => ({
                    ...prevOrderFormData,
                    items: {
                        ...prevOrderFormData.items,
                        snacks: isSameOrderExists === false ? [...prevOrderFormData.items.snacks, snacksOrderFormData] : prevOrderFormData.items.snacks.map((snacksOrderItem, index) => (index === isSameOrderExists ? { ...snacksOrderItem, quantity: snacksOrderItem.quantity + snacksOrderFormData.quantity } : snacksOrderItem))
                    }
                }));
            }
        }
        setIsModalOpen(false);
        setSnacksOrderFormData(Order.SnacksItem.Frontend.State(snack));
    }

    return (
        <>
            <OrderFormItem orderItem={snack} orderItemCategory="snacks" setIsModalOpen={setIsModalOpen} />
            {isModalOpen && (
                <Modal setIsModalOpen={setIsModalOpen} closeButton>
                    <Section title={`${snack.name} $${snack.price}`}>
                        <div className="flex gap-4 items-center self-center">
                            <BigCircleButton className="text-yellow-800 bg-yellow-400" onClick={() => handleQuantityChange(false)} disabled={snacksOrderFormData.quantity === 0}>
                                <IconMinus size={24} />
                            </BigCircleButton>
                            <span className="text-xl">{snacksOrderFormData.quantity}</span>
                            <BigCircleButton className="text-yellow-800 bg-yellow-400" onClick={() => handleQuantityChange(true)}>
                                <IconPlus size={24} />
                            </BigCircleButton>
                        </div>
                        <ChipButton className="self-center bg-sky-700" onClick={handleAddToCart} disabled={!isValidOrder}>
                            <span>加落購物車</span>
                            <span>${Tools.Frontend.getOrderSubtotal(snacksOrderFormData) || snack.price}</span>
                        </ChipButton>
                    </Section>
                </Modal>
            )}
        </>
    );
}
