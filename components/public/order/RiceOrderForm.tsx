"use client";

import { useSetOrderFormData } from "@/contexts/OrderFormContextProvider";
import { MenuCategories, RiceItem } from "@/types/Menu";
import RiceOrderFormSection from "./RiceOrderFormSection";

interface RiceOrderFormProps {
    riceMenu: RiceItem[];
}

export default function RiceOrderForm({ riceMenu }: RiceOrderFormProps) {
    return (
        <section className="flex flex-col gap-4">
            <RiceOrderFormSection menu={riceMenu} category="beef" />
            <RiceOrderFormSection menu={riceMenu} category="pork" />
            <RiceOrderFormSection menu={riceMenu} category="eel" />
            <RiceOrderFormSection menu={riceMenu} category="combo" />
            <RiceOrderFormSection menu={riceMenu} category="curry" />
        </section>
    );
}
