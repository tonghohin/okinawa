"use client";

import { InitialStates } from "@/InitialStates/InitialStates";
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
                            <button type="button" className={`rounded-full p-6 transition-all ${snacksOrderFormData.quantity === 0 ? "bg-neutral-300 cursor-default" : "bg-yellow-400 hover:bg-yellow-500"}`} onClick={() => handleQuantityChange(false)}>
                                <IconMinus className="text-yellow-800" size={24} />
                            </button>
                            <span className="text-xl">{snacksOrderFormData.quantity}</span>
                            <button type="button" className="rounded-full bg-yellow-500 p-6 hover:bg-yellow-600 transition-all" onClick={() => handleQuantityChange(true)}>
                                <IconPlus className="text-yellow-800" size={24} />
                            </button>
                        </div>
                        <button type="button" className={`flex items-center self-center gap-4 rounded-full px-6 py-2 transition-all ${isValidOrder ? "bg-sky-700 text-neutral-50 hover:bg-sky-600 hover:shadow-md" : "bg-neutral-300 cursor-default"}`} onClick={handleAddToCart} disabled={!isValidOrder}>
                            <span>加落購物車</span>
                            <span>${Tools.Frontend.getSnacksOrderSubtotal(snacksOrderFormData) || snack.price}</span>
                        </button>
                    </Section>
                </Modal>
            )}
        </>
    );
}
