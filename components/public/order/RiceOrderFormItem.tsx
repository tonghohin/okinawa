"use client";

import { RiceItem } from "@/types/Menu";
import { RiceOrderItem } from "@/types/Order";
import { IconCircleCheck, IconCircleCheckFilled, IconCircleX, IconCircleXFilled, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";

interface RiceOrderFormItemProps {
    rice: RiceItem;
}

export default function RiceOrderFormItem({ rice }: RiceOrderFormItemProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderFormData, setOrderFormData] = useState<RiceOrderItem>({
        id: rice.id,
        quantity: 0,
        toUdon: false,
        addOn: ""
    });

    return (
        <>
            <p className="flex gap-4 items-center justify-between border border-yellow-500 rounded p-2 cursor-pointer hover:bg-yellow-500 transition-all" onClick={() => setIsModalOpen(true)}>
                <span>{rice.name}</span>
                <div className="flex items-center gap-4">
                    <span>${rice.price}</span>
                    {/* <span className="rounded-full p-1 bg-slate-600 opacity-90">{orderFormData?.items.rice.filter((item) => item.id === rice.id).length || 0}</span> */}
                    <IconPlus className="rounded-full p-1 bg-yellow-500" size={24} />
                </div>
            </p>
            {isModalOpen && (
                <section className="fixed left-0 top-0 w-full h-full p-4 bg-slate-950 bg-opacity-30 backdrop-blur-sm items-center justify-center">
                    <article className="flex flex-col items-center gap-4 p-4 rounded bg-yellow-300">
                        <IconX className="text-slate-800 self-end cursor-pointer" onClick={() => setIsModalOpen(false)} size={24} />
                        <h1 className="text-lg">{rice.name}</h1>
                        <div className="flex gap-4 items-center">
                            <label htmlFor="toUdon">轉烏冬</label>
                            {orderFormData.toUdon ? (
                                <>
                                    <IconCircleCheckFilled className="text-yellow-800 cursor-pointer" size={24} />
                                    <IconCircleX className="text-yellow-600 cursor-pointer" onClick={() => setOrderFormData((prevOrderFormDate) => ({ ...prevOrderFormDate, toUdon: false }))} size={24} />
                                </>
                            ) : (
                                <>
                                    <IconCircleCheck className="text-yellow-600 cursor-pointer" onClick={() => setOrderFormData((prevOrderFormDate) => ({ ...prevOrderFormDate, toUdon: true }))} size={24} />
                                    <IconCircleXFilled className="text-yellow-800 cursor-pointer" size={24} />
                                </>
                            )}
                        </div>
                    </article>
                </section>
            )}
        </>
    );
}
