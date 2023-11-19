"use client";

import { useOrderFormData } from "@/contexts/OrderFormContextProvider";
import { Tools } from "@/tools/Tools";
import { IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";

export default function Total() {
    const orderFormData = useOrderFormData();
    const totalNumberOfItems = orderFormData ? Tools.Frontend.getTotalNumberOfItems(orderFormData) : 0;

    return (
        <Link href="/order/cart" className="flex items-center gap-4 bg-sky-700 text-neutral-50 rounded-full px-6 py-2 cursor-pointer transition-all hover:bg-sky-800 hover:shadow-md">
            <IconShoppingCart size={24} />
            <span>${orderFormData?.total || 0}</span>
            {totalNumberOfItems > 0 && (
                <div className="flex items-center justify-center w-6 h-6 text-xs rounded-full bg-sky-900 text-neutral-50">
                    <span>{totalNumberOfItems}</span>
                </div>
            )}
        </Link>
    );
}
