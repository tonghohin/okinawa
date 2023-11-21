"use client";

import ChipLink from "@/components/ChipLink";
import { useOrderFormData } from "@/contexts/OrderFormContextProvider";
import { Tools } from "@/tools/Tools";
import { IconShoppingCart } from "@tabler/icons-react";

export default function Total() {
    const orderFormData = useOrderFormData();
    const totalNumberOfItems = orderFormData ? Tools.Frontend.getTotalNumberOfItems(orderFormData) : 0;

    return (
        <ChipLink href="/order/cart" className="bg-sky-700 text-neutral-50">
            <IconShoppingCart size={24} />
            <span>${orderFormData?.total || 0}</span>
            {totalNumberOfItems > 0 && (
                <div className="flex items-center justify-center w-6 h-6 text-xs rounded-full bg-sky-900 text-neutral-50">
                    <span>{totalNumberOfItems}</span>
                </div>
            )}
        </ChipLink>
    );
}
