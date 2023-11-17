"use client";

import { RiceItem } from "@/types/Menu";
import { RiceOrderItem } from "@/types/Order";
import { IconCaretLeftFilled, IconCaretRightFilled, IconCircleCheck, IconCircleCheckFilled, IconCircleX, IconCircleXFilled, IconPlus, IconX } from "@tabler/icons-react";
import React, { useState } from "react";

interface RiceOrderFormItemProps {
    rice: RiceItem;
    addOns: RiceItem[];
}

export default function RiceOrderFormItem({ rice, addOns }: RiceOrderFormItemProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderFormData, setOrderFormData] = useState<RiceOrderItem>({
        id: rice.id,
        quantity: 0,
        toUdon: false,
        addOn: ""
    });

    function handleOrderFormDataChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setOrderFormData((prevOrderFormData) => ({ ...prevOrderFormData, [name]: value }));
    }

    function handleQuantityChange(increment: boolean) {
        if (increment) {
            setOrderFormData((prevOrderFromData) => ({ ...prevOrderFromData, quantity: prevOrderFromData.quantity + 1 }));
        } else {
            setOrderFormData((prevOrderFromData) => {
                return prevOrderFromData.quantity > 0 ? { ...prevOrderFromData, quantity: prevOrderFromData.quantity - 1 } : prevOrderFromData;
            });
        }
    }

    function handleToUdonChange(toUdon: boolean) {
        if (toUdon) {
            setOrderFormData((prevOrderFromData) => ({ ...prevOrderFromData, toUdon: true }));
        } else {
            setOrderFormData((prevOrderFromData) => ({ ...prevOrderFromData, toUdon: false }));
        }
    }

    function handleAddOnChange(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const { name, value } = e.currentTarget;
        setOrderFormData((prevOrderFormData) => ({ ...prevOrderFormData, [name]: value }));
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
                        <IconX className="rounded-full p-1 bg-slate-400 opacity-60 cursor-pointer self-end hover:opacity-100 transition-all" onClick={() => setIsModalOpen(false)} size={24} />
                        <h1 className="text-xl border-b border-slate-800">{rice.name}</h1>
                        <div className="flex gap-4 items-center">
                            <label htmlFor="toUdon">轉烏冬</label>
                            <div className="flex gap-4 items-center rounded-full p-2">
                                {orderFormData.toUdon ? (
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
                        </div>
                        <div className="flex flex-col gap-4 items-center">
                            <label htmlFor="addOn">轉套餐 ＋$15</label>
                            <div className="flex gap-4">
                                {addOns.map((addOn) => (
                                    <button key={addOn.id} name="addOn" value={addOn.id} className={`cursor-pointer rounded border border-yellow-400 p-2 ${orderFormData.addOn === addOn.id && "bg-yellow-500"}`} onClick={handleAddOnChange}>
                                        {addOn.name}
                                    </button>
                                ))}
                                <button name="addOn" value="" className={`cursor-pointer rounded border border-yellow-400 p-2 ${orderFormData.addOn === "" && "bg-yellow-500"}`} onClick={handleAddOnChange}>
                                    唔使了
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center rounded-full bg-slate-100 p-2">
                            <IconCaretLeftFilled className={`text-yellow-800 cursor-pointer ${orderFormData.quantity === 0 && "text-slate-400"}`} size={24} onClick={() => handleQuantityChange(false)} />
                            <span>{orderFormData.quantity}</span>
                            <IconCaretRightFilled className="text-yellow-800 cursor-pointer" size={24} onClick={() => handleQuantityChange(true)} />
                        </div>
                        <button className="bg-sky-700 text-slate-50 rounded p-2 hover:bg-sky-600 hover:shadow-md transition-all">加落購物車</button>
                    </article>
                </section>
            )}
        </>
    );
}
