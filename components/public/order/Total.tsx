"use client";

import ChipLink from "@/components/ChipLink";
import useOrderFormDataStore from "@/stores/orderFormDataStore";
import { Tools } from "@/tools/Tools";
import { IconShoppingCart } from "@tabler/icons-react";

export default function Total() {
    const orderFormData = useOrderFormDataStore((state) => state.formData);
    const totalNumberOfItems = Tools.Frontend.getTotalNumberOfItems(orderFormData);

    return (
        totalNumberOfItems > 0 && (
            <ChipLink href="/order/cart" className="bg-sky-700 self-center">
                <IconShoppingCart size={24} color="#fafafa" />
                <span className="text-neutral-50">${orderFormData?.total || 0}</span>
                <div className="flex items-center justify-center w-6 h-6 text-xs rounded-full bg-sky-900 text-neutral-50">
                    <span className="text-neutral-50">{totalNumberOfItems}</span>
                </div>
            </ChipLink>
        )
    );
}
