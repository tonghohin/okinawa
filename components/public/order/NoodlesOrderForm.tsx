import { NoodlesCategories, NoodlesItem } from "@/types/Menu";
import NoodlesOrderFormItem from "./NoodlesOrderFormItem";

interface NoodlesOrderFormProps {
    noodlesMenu: NoodlesItem[];
}

export default function NoodlesOrderForm({ noodlesMenu }: NoodlesOrderFormProps) {
    const noodlesMenuMain = noodlesMenu.filter((noodles) => noodles.category === "main");
    const noodlesMenuAddOns = noodlesMenu.filter((noodles) => noodles.category === "addOn");

    return (
        <section className="border border-yellow-600 rounded p-4 flex flex-col gap-4">
            <h1 className="text-lg text-center">揀樣{NoodlesCategories.main}先</h1>
            {noodlesMenuMain.map((noodles) => (
                <NoodlesOrderFormItem key={noodles.id} noodles={noodles} addOns={noodlesMenuAddOns} />
            ))}
        </section>
    );
}