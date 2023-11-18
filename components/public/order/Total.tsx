"use client";

import { useOrderFormData } from "@/contexts/OrderFormContextProvider";
import { IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";

export default function Total() {
    const orderFormData = useOrderFormData();

    return (
        <Link href="/order/cart" className="flex items-center gap-4 bg-sky-700 text-neutral-50 rounded-full px-6 py-2 cursor-pointer transition-all hover:bg-sky-800 hover:shadow-md">
            <IconShoppingCart size={24} />
            <span>購物車</span>
            <span>Total: ${orderFormData?.total || 0}</span>
        </Link>
    );
}
