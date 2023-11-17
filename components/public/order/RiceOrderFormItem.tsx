"use client";

import { InitialStates } from "@/InitialStates/InitialStates";
import { useSetOrderFormData } from "@/contexts/OrderFormContextProvider";
import { RiceItem } from "@/types/Menu";
import { RiceOrderItem } from "@/types/Order";
import { IconCaretLeftFilled, IconCaretRightFilled, IconCircleCheck, IconCircleCheckFilled, IconCircleX, IconCircleXFilled, IconPlus, IconX } from "@tabler/icons-react";
import React, { useState } from "react";

interface RiceOrderFormItemProps {
    rice: RiceItem;
    addOns: RiceItem[];
}

export default function RiceOrderFormItem({ rice, addOns }: RiceOrderFormItemProps) {
    const setOrderFormData = useSetOrderFormData();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [riceOrderFormData, setRiceOrderFormData] = useState<RiceOrderItem>(InitialStates.RiceOrderItem(rice.id));

    function handleQuantityChange(increment: boolean) {
        if (increment) {
            setRiceOrderFormData((prevRiceOrderFromData) => ({ ...prevRiceOrderFromData, quantity: prevRiceOrderFromData.quantity + 1 }));
        } else {
            setRiceOrderFormData((prevRiceOrderFromData) => {
                return prevRiceOrderFromData.quantity > 0 ? { ...prevRiceOrderFromData, quantity: prevRiceOrderFromData.quantity - 1 } : prevRiceOrderFromData;
            });
        }
    }

    function handleToUdonChange(toUdon: boolean) {
        if (toUdon) {
            setRiceOrderFormData((prevOrderFromData) => ({ ...prevOrderFromData, toUdon: true }));
        } else {
            setRiceOrderFormData((prevOrderFromData) => ({ ...prevOrderFromData, toUdon: false }));
        }
    }

    function handleAddOnChange(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const { name, value } = e.currentTarget;
        setRiceOrderFormData((prevRiceOrderFormData) => ({ ...prevRiceOrderFormData, [name]: value }));
    }

    function handleAddToCart() {
        const addOnPrice = addOns.find((addOn) => addOn.id === riceOrderFormData.addOn)?.price || 0;
        const subTotal = (rice.price + addOnPrice) * riceOrderFormData.quantity;

        if (setOrderFormData) {
            setOrderFormData((prevOrderFormData) => ({
                ...prevOrderFormData,
                items: {
                    ...prevOrderFormData.items,
                    rice: [...prevOrderFormData.items.rice, { ...riceOrderFormData, subTotal: subTotal }]
                }
            }));
        }
        setIsModalOpen(false);
        setRiceOrderFormData(InitialStates.RiceOrderItem(rice.id));
    }

    return (
        <>
            <p className="flex gap-4 items-center justify-between border border-yellow-500 rounded p-2 cursor-pointer hover:bg-yellow-500 transition-all" onClick={() => setIsModalOpen(true)}>
                <span>{rice.name}</span>
                <div className="flex items-center gap-4">
                    <span>${rice.price}</span>
                    <IconPlus className="rounded-full p-1 bg-yellow-500" size={24} />
                </div>
            </p>
            {isModalOpen && (
                <section className="fixed left-0 top-0 w-full h-full p-4 bg-slate-800 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center">
                    <article className="flex flex-col items-center gap-4 p-4 rounded bg-yellow-300">
                        <IconX className="rounded-full p-1 bg-slate-400 bg-opacity-30 cursor-pointer self-end hover:bg-opacity-100 transition-all" onClick={() => setIsModalOpen(false)} size={24} />
                        <h1 className="text-xl border-b border-slate-800">
                            {rice.name} ${rice.price}
                        </h1>
                        <div className="flex gap-4 items-center">
                            <label htmlFor="toUdon">轉烏冬</label>
                            {riceOrderFormData.toUdon ? (
                                <>
                                    <IconCircleCheckFilled className="text-yellow-800 cursor-pointer" size={24} />
                                    <IconCircleX className="text-yellow-600 cursor-pointer" onClick={() => handleToUdonChange(false)} size={24} />
                                </>
                            ) : (
                                <>
                                    <IconCircleCheck className="text-yellow-600 cursor-pointer" onClick={() => handleToUdonChange(true)} size={24} />
                                    <IconCircleXFilled className="text-yellow-800 cursor-pointer" size={24} />
                                </>
                            )}
                        </div>
                        <div className="flex flex-col gap-4 items-center">
                            <label htmlFor="addOn">轉套餐</label>
                            <div className="flex gap-4">
                                {addOns.map((addOn) => (
                                    <button key={addOn.id} name="addOn" value={addOn.id} className={`cursor-pointer rounded-full border border-yellow-400 p-2 ${riceOrderFormData.addOn === addOn.id && "bg-yellow-500"}`} onClick={handleAddOnChange}>
                                        {addOn.name} ＋${addOn.price}
                                    </button>
                                ))}
                                <button name="addOn" value="" className={`cursor-pointer rounded-full border border-yellow-400 p-2 ${riceOrderFormData.addOn === "" && "bg-yellow-500"}`} onClick={handleAddOnChange}>
                                    唔使了
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center rounded-full bg-slate-100 p-2">
                            <IconCaretLeftFilled className={`text-yellow-800 cursor-pointer ${riceOrderFormData.quantity === 0 && "text-slate-400"}`} size={24} onClick={() => handleQuantityChange(false)} />
                            <span>{riceOrderFormData.quantity}</span>
                            <IconCaretRightFilled className="text-yellow-800 cursor-pointer" size={24} onClick={() => handleQuantityChange(true)} />
                        </div>
                        <button className="bg-sky-700 text-slate-50 rounded p-2 hover:bg-sky-600 hover:shadow-md transition-all" onClick={handleAddToCart}>
                            加落購物車
                        </button>
                    </article>
                </section>
            )}
        </>
    );
}
