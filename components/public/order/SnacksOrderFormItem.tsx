"use client";

import { InitialStates } from "@/InitialStates/InitialStates";
import BigCircleButton from "@/components/BigCircleButton";
import ChipButton from "@/components/ChipButton";
import CircleButton from "@/components/CircleButton";
import Modal from "@/components/Modal";
import Section from "@/components/Section";
import { useOrderFormData, useSetOrderFormData } from "@/contexts/OrderFormContextProvider";
import { Tools } from "@/tools/Tools";
import { SnacksItem } from "@/types/Menu";
import { SnacksOrderItem } from "@/types/Order";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useMemo, useState } from "react";

interface SnacksOrderFormItemProps {
    snack: SnacksItem;
}

export default function SnacksOrderFormItem({ snack }: SnacksOrderFormItemProps) {
    const orderFormData = useOrderFormData();
    const setOrderFormData = useSetOrderFormData();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [snacksOrderFormData, setSnacksOrderFormData] = useState<SnacksOrderItem.Frontend>(InitialStates.SnacksOrderItem(snack));

    const itemCount = useMemo(() => (orderFormData ? Tools.Frontend.getNumberOfItems(orderFormData.items, "snacks", snack.id) : 0), [orderFormData]);

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
        setSnacksOrderFormData(InitialStates.SnacksOrderItem(snack));
    }

    return (
        <>
            <section className="flex gap-4 items-center justify-between border border-yellow-500 rounded p-2 cursor-pointer hover:bg-yellow-500 transition-all" onClick={() => setIsModalOpen(true)}>
                <span>{snack.name}</span>
                <div className="flex items-center gap-4">
                    {itemCount > 0 && (
                        <div className="flex items-center justify-center w-6 h-6 text-xs rounded-full bg-sky-700/80 text-neutral-50">
                            <span>{itemCount}</span>
                        </div>
                    )}
                    <span>${snack.price}</span>
                    <CircleButton className="bg-yellow-500">
                        <IconPlus size={18} />
                    </CircleButton>
                </div>
            </section>
            {isModalOpen && (
                <Modal setIsModalOpen={setIsModalOpen}>
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
