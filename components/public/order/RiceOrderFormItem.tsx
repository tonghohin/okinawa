"use client";

import { InitialStates } from "@/InitialStates/InitialStates";
import { useOrderFormData, useSetOrderFormData } from "@/contexts/OrderFormContextProvider";
import { Tools } from "@/tools/Tools";
import { RiceItem } from "@/types/Menu";
import { RiceOrderItem } from "@/types/Order";
import { IconCheck, IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import React, { useMemo, useState } from "react";

interface RiceOrderFormItemProps {
    rice: RiceItem;
    addOns: RiceItem[];
}

export default function RiceOrderFormItem({ rice, addOns }: RiceOrderFormItemProps) {
    const orderFormData = useOrderFormData();
    const setOrderFormData = useSetOrderFormData();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [riceOrderFormData, setRiceOrderFormData] = useState<RiceOrderItem.Frontend>(InitialStates.RiceOrderItem(rice));

    const itemCount = useMemo(() => (orderFormData ? Tools.Frontend.getNumberOfItems(orderFormData.items, "rice", rice.id) : 0), [orderFormData]);

    const isValidOrder = riceOrderFormData.quantity > 0;

    function handleQuantityChange(increment: boolean) {
        if (increment) {
            setRiceOrderFormData((prevRiceOrderFormData) => ({ ...prevRiceOrderFormData, quantity: prevRiceOrderFormData.quantity + 1 }));
        } else {
            setRiceOrderFormData((prevRiceOrderFormData) => {
                return prevRiceOrderFormData.quantity > 0 ? { ...prevRiceOrderFormData, quantity: prevRiceOrderFormData.quantity - 1 } : prevRiceOrderFormData;
            });
        }
    }

    function handleToUdonChange(toUdon: boolean) {
        if (toUdon) {
            setRiceOrderFormData((prevRiceOrderFormData) => ({ ...prevRiceOrderFormData, toUdon: true }));
        } else {
            setRiceOrderFormData((prevRiceOrderFormData) => ({ ...prevRiceOrderFormData, toUdon: false }));
        }
    }

    function handleAddOnChange(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const { name, value } = e.currentTarget;
        const addOn = addOns.find((addOn) => addOn.id === value);
        setRiceOrderFormData((prevRiceOrderFormData) => ({ ...prevRiceOrderFormData, addOn: addOn || null }));
    }

    function handleAddToCart() {
        if (riceOrderFormData.quantity > 0) {
            if (setOrderFormData) {
                setOrderFormData((prevOrderFormData) => ({
                    ...prevOrderFormData,
                    items: {
                        ...prevOrderFormData.items,
                        rice: [...prevOrderFormData.items.rice, riceOrderFormData]
                    }
                }));
            }
        }
        setIsModalOpen(false);
        setRiceOrderFormData(InitialStates.RiceOrderItem(rice));
    }

    return (
        <>
            <section className="flex gap-4 items-center justify-between border border-yellow-500 rounded p-2 cursor-pointer hover:bg-yellow-500 transition-all" onClick={() => setIsModalOpen(true)}>
                <span>{rice.name}</span>
                <div className="flex items-center gap-4">
                    {itemCount > 0 && (
                        <div className="flex items-center justify-center w-6 h-6 text-xs rounded-full bg-sky-700/80 text-neutral-50">
                            <span>{itemCount}</span>
                        </div>
                    )}
                    <span>${rice.price}</span>
                    <IconPlus className="rounded-full p-1 bg-yellow-500" size={24} />
                </div>
            </section>
            {isModalOpen && (
                <section className="fixed left-0 top-0 w-full h-full p-4 bg-neutral-800 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center">
                    <article className="flex flex-col items-center gap-4 p-4 rounded bg-yellow-300">
                        <button className="rounded-full p-1 bg-neutral-400 bg-opacity-30 cursor-pointer self-end hover:bg-opacity-100 transition-all" onClick={() => setIsModalOpen(false)}>
                            <IconX size={24} />
                        </button>
                        <h1 className="text-xl border-b border-neutral-800">
                            <span>{rice.name}</span> <span>${rice.price}</span>
                        </h1>
                        <div className="flex flex-col gap-4 items-center">
                            <label htmlFor="toUdon">轉烏冬</label>
                            <div className="flex items-center gap-4">
                                <button className={`rounded-full px-6 py-2 hover:bg-yellow-500 transition-all ${riceOrderFormData.toUdon ? "bg-yellow-500" : "border border-yellow-500"}`} onClick={() => handleToUdonChange(true)}>
                                    <IconCheck className="text-yellow-800 cursor-pointer" size={24} />
                                </button>
                                <button className={`rounded-full px-6 py-2 hover:bg-yellow-500 transition-all ${!riceOrderFormData.toUdon ? "bg-yellow-500" : "border border-yellow-500"}`} onClick={() => handleToUdonChange(false)}>
                                    <IconX className="text-yellow-800" size={24} />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 items-center">
                            <label htmlFor="addOn">轉套餐</label>
                            <div className="flex gap-4 flex-wrap justify-center">
                                {addOns.map((addOn) => (
                                    <button key={addOn.id} name="addOn" value={addOn.id} className={`rounded-full border border-yellow-500 px-6 py-2 hover:bg-yellow-500 transition-all ${riceOrderFormData.addOn?.id === addOn.id && "bg-yellow-500"}`} onClick={handleAddOnChange}>
                                        {addOn.name} ＋${addOn.price}
                                    </button>
                                ))}
                                <button name="addOn" className={`rounded-full border border-yellow-500 px-6 py-2 hover:bg-yellow-500 transition-all ${!riceOrderFormData.addOn && "bg-yellow-500"}`} onClick={handleAddOnChange}>
                                    唔使了
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <button className={`rounded-full p-6 transition-all ${riceOrderFormData.quantity === 0 ? "bg-neutral-300 cursor-default" : "bg-yellow-400 hover:bg-yellow-500"}`} onClick={() => handleQuantityChange(false)}>
                                <IconMinus className="text-yellow-800" size={24} />
                            </button>
                            <span className="text-xl">{riceOrderFormData.quantity}</span>
                            <button className="rounded-full bg-yellow-500 p-6 hover:bg-yellow-600 transition-all" onClick={() => handleQuantityChange(true)}>
                                <IconPlus className="text-yellow-800" size={24} />
                            </button>
                        </div>
                        <button className={`flex items-center gap-4 rounded-full px-6 py-2 transition-all ${isValidOrder ? "bg-sky-700 text-neutral-50 hover:bg-sky-600 hover:shadow-md" : "bg-neutral-300 cursor-default"}`} onClick={handleAddToCart} disabled={!isValidOrder}>
                            <span>加落購物車</span>
                            <span>${Tools.Frontend.getRiceOrderSubtotal(riceOrderFormData) || rice.price}</span>
                        </button>
                    </article>
                </section>
            )}
        </>
    );
}
