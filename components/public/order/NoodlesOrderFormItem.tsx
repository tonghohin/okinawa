"use client";

import { InitialStates } from "@/InitialStates/InitialStates";
import CircleButton from "@/components/CircleButton";
import Modal from "@/components/Modal";
import Section from "@/components/Section";
import { useOrderFormData, useSetOrderFormData } from "@/contexts/OrderFormContextProvider";
import { Tools } from "@/tools/Tools";
import { NoodlesCategories, NoodlesItem } from "@/types/Menu";
import { NoodlesOrderItem } from "@/types/Order";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import React, { useMemo, useState } from "react";

interface NoodlesOrderFormItemProps {
    noodles: NoodlesItem;
    addOns: NoodlesItem[];
}

export default function NoodlesOrderFormItem({ noodles, addOns }: NoodlesOrderFormItemProps) {
    const orderFormData = useOrderFormData();
    const setOrderFormData = useSetOrderFormData();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [noodlesOrderFormData, setNoodlesOrderFormData] = useState<NoodlesOrderItem.Frontend>(InitialStates.NoodlesOrderItem(noodles));

    const itemCount = useMemo(() => (orderFormData ? Tools.Frontend.getNumberOfItems(orderFormData.items, "noodles", noodles.id) : 0), [orderFormData]);

    const isValidOrder = noodlesOrderFormData.quantity > 0 && noodlesOrderFormData.addOns.length >= (noodles.minimumAddOns || 0);

    function handleQuantityChange(increment: boolean) {
        if (increment) {
            setNoodlesOrderFormData((prevNoodlesOrderFromData) => ({ ...prevNoodlesOrderFromData, quantity: prevNoodlesOrderFromData.quantity + 1 }));
        } else {
            setNoodlesOrderFormData((prevNoodlesOrderFromData) => {
                return prevNoodlesOrderFromData.quantity > 0 ? { ...prevNoodlesOrderFromData, quantity: prevNoodlesOrderFromData.quantity - 1 } : prevNoodlesOrderFromData;
            });
        }
    }

    function handleAddOnsChange(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const { name, value } = e.currentTarget;
        const addOn = addOns.find((addOn) => addOn.id === value);
        if (addOn) {
            setNoodlesOrderFormData((prevNoodlesOrderFormData) => (prevNoodlesOrderFormData.addOns.find((addOn) => addOn.id === value) ? { ...prevNoodlesOrderFormData, addOns: prevNoodlesOrderFormData.addOns.filter((addOn) => addOn.id !== value) } : { ...prevNoodlesOrderFormData, addOns: [...prevNoodlesOrderFormData.addOns, addOn] }));
        }
    }

    function handleAddToCart() {
        if (noodlesOrderFormData.quantity > 0) {
            if (orderFormData && setOrderFormData) {
                const isSameOrderExists = Tools.Frontend.checkOrderExists(orderFormData, noodlesOrderFormData, "noodles");
                setOrderFormData((prevOrderFormData) => ({
                    ...prevOrderFormData,
                    items: {
                        ...prevOrderFormData.items,
                        noodles: isSameOrderExists === false ? [...prevOrderFormData.items.noodles, noodlesOrderFormData] : prevOrderFormData.items.noodles.map((noodlesOrderItem, index) => (index === isSameOrderExists ? { ...noodlesOrderItem, quantity: noodlesOrderItem.quantity + noodlesOrderFormData.quantity } : noodlesOrderItem))
                    }
                }));
            }
        }
        setIsModalOpen(false);
        setNoodlesOrderFormData(InitialStates.NoodlesOrderItem(noodles));
    }

    return (
        <>
            <section className="flex gap-4 items-center justify-between border border-yellow-500 rounded p-2 cursor-pointer hover:bg-yellow-500 transition-all" onClick={() => setIsModalOpen(true)}>
                <span>{noodles.name}</span>
                <div className="flex items-center gap-4">
                    {itemCount > 0 && (
                        <div className="flex items-center justify-center w-6 h-6 text-xs rounded-full bg-sky-700/80 text-neutral-50">
                            <span>{itemCount}</span>
                        </div>
                    )}
                    <span>${noodles.price}</span>
                    <CircleButton className="bg-yellow-500">
                        <IconPlus size={18} />
                    </CircleButton>
                </div>
            </section>
            {isModalOpen && (
                <Modal setIsModalOpen={setIsModalOpen}>
                    <Section title={`${noodles.name} $${noodles.price}`}>
                        <h1 className="text-lg text-center">
                            <span>{NoodlesCategories.addOn}配料</span> <span>{noodles.minimumAddOns ? `（${noodles.minimumAddOns}款起）` : "（唔加都得）"}</span>
                        </h1>
                        <div className="flex flex-col overflow-auto">
                            {Object.entries(Tools.Frontend.groupNoodlesAddOnsByPrice(addOns)).map(([price, addOn]) => (
                                <section className="flex gap-4 items-center border-b border-b-yellow-500 flex-wrap py-4">
                                    {addOn.map((addOn) => (
                                        <button type="button" key={addOn.id} value={addOn.id} className={`rounded-full border border-yellow-500 text-sm px-4 py-2 transition-all ${noodlesOrderFormData.addOns.find((formAddOn) => formAddOn.id === addOn.id) ? "bg-yellow-500" : "hover:bg-yellow-500"}`} onClick={handleAddOnsChange}>
                                            <span>{addOn.name}</span>
                                            <span>＋${addOn.price}</span>
                                        </button>
                                    ))}
                                </section>
                            ))}
                        </div>
                        <div className="flex gap-4 items-center self-center">
                            <button type="button" className={`rounded-full p-6 transition-all ${noodlesOrderFormData.quantity === 0 ? "bg-neutral-300 cursor-default" : "bg-yellow-400 hover:bg-yellow-500"}`} onClick={() => handleQuantityChange(false)}>
                                <IconMinus className="text-yellow-800" size={24} />
                            </button>
                            <span className="text-xl">{noodlesOrderFormData.quantity}</span>
                            <button type="button" className="rounded-full bg-yellow-500 p-6 hover:bg-yellow-600 transition-all" onClick={() => handleQuantityChange(true)}>
                                <IconPlus className="text-yellow-800" size={24} />
                            </button>
                        </div>
                        <button type="button" className={`flex items-center self-center gap-4 rounded-full px-6 py-2 transition-all ${isValidOrder ? "bg-sky-700 text-neutral-50 hover:bg-sky-600 hover:shadow-md" : "bg-neutral-300 cursor-default"}`} onClick={handleAddToCart} disabled={!isValidOrder}>
                            <span>加落購物車</span>
                            <span>${Tools.Frontend.getNoodlesOrderSubtotal(noodlesOrderFormData) || noodles.price}</span>
                        </button>
                    </Section>
                </Modal>
            )}
        </>
    );
}
