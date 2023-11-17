"use client";

import { InitialStates } from "@/InitialStates/InitialStates";
import { useSetOrderFormData } from "@/contexts/OrderFormContextProvider";
import { SnackItem } from "@/types/Menu";
import { SnacksOrderItem } from "@/types/Order";
import { IconCaretLeftFilled, IconCaretRightFilled, IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";

interface SnacksOrderFormItemProps {
    snack: SnackItem;
}

export default function SnacksOrderFormItem({ snack }: SnacksOrderFormItemProps) {
    const setOrderFormData = useSetOrderFormData();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [snacksOrderFormData, setSnacksOrderFormData] = useState<SnacksOrderItem>(InitialStates.SnacksOrderItem(snack.id));

    function handleQuantityChange(increment: boolean) {
        if (increment) {
            setSnacksOrderFormData((prevOrderFromData) => ({ ...prevOrderFromData, quantity: prevOrderFromData.quantity + 1 }));
        } else {
            setSnacksOrderFormData((prevOrderFromData) => {
                return prevOrderFromData.quantity > 0 ? { ...prevOrderFromData, quantity: prevOrderFromData.quantity - 1 } : prevOrderFromData;
            });
        }
    }

    function handleAddToCart() {
        const subTotal = snack.price * snacksOrderFormData.quantity;

        if (setOrderFormData) {
            setOrderFormData((prevOrderFormData) => ({
                ...prevOrderFormData,
                items: {
                    ...prevOrderFormData.items,
                    snacks: [...prevOrderFormData.items.snacks, { ...snacksOrderFormData, subTotal: subTotal }]
                }
            }));
        }
        setIsModalOpen(false);
        setSnacksOrderFormData(InitialStates.SnacksOrderItem(snack.id));
    }

    return (
        <>
            <p className="flex gap-4 items-center justify-between border border-yellow-500 rounded p-2 cursor-pointer hover:bg-yellow-500 transition-all" onClick={() => setIsModalOpen(true)}>
                <span>{snack.name}</span>
                <div className="flex items-center gap-4">
                    <span>${snack.price}</span>
                    <IconPlus className="rounded-full p-1 bg-yellow-500" size={24} />
                </div>
            </p>
            {isModalOpen && (
                <section className="fixed left-0 top-0 w-full h-full p-4 bg-slate-800 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center">
                    <article className="flex flex-col items-center gap-4 p-4 rounded bg-yellow-300">
                        <IconX className="rounded-full p-1 bg-slate-400 bg-opacity-30 cursor-pointer self-end hover:bg-opacity-100 transition-all" onClick={() => setIsModalOpen(false)} size={24} />
                        <h1 className="text-xl border-b border-slate-800">
                            {snack.name} ${snack.price}
                        </h1>
                        <div className="flex gap-4 items-center">
                            <button className={`rounded-full bg-yellow-400 p-6 hover:bg-yellow-500 transition-all ${snacksOrderFormData.quantity === 0 && "bg-slate-400"}`} onClick={() => handleQuantityChange(false)}>
                                <IconMinus className="text-yellow-800" size={24} />
                            </button>
                            <span className="text-xl">{snacksOrderFormData.quantity}</span>
                            <button className={`rounded-full bg-yellow-500 p-6 hover:bg-yellow-600 transition-all ${snacksOrderFormData.quantity === 0 && "bg-slate-400"}`} onClick={() => handleQuantityChange(true)}>
                                <IconPlus className="text-yellow-800" size={24} />
                            </button>
                        </div>

                        <button className="flex-1 bg-sky-700 text-slate-50 rounded p-2 hover:bg-sky-600 hover:shadow-md transition-all" onClick={handleAddToCart}>
                            加落購物車
                        </button>
                    </article>
                </section>
            )}
        </>
    );
}
