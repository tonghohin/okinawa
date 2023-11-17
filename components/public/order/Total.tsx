"use client";

import { useOrderFormData } from "@/contexts/OrderFormContextProvider";
import { IconShoppingCart } from "@tabler/icons-react";

export default function Total() {
    const orderFormData = useOrderFormData();

    return (
        <article className="flex items-center gap-4 bg-sky-700 text-slate-50 rounded-full px-4 py-2 cursor-pointer transition-all hover:bg-sky-800 hover:shadow-md">
            <IconShoppingCart size={24} />
            <span>購物車</span>
            <span>Total: ${orderFormData?.total || 0}</span>
        </article>
    );
}
