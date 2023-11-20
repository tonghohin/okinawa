import { NoodlesCategories, NoodlesItem } from "@/types/Menu";
import NoodlesOrderFormItem from "./NoodlesOrderFormItem";
import Section from "@/components/Section";

interface NoodlesOrderFormProps {
    noodlesMenu: NoodlesItem[];
}

export default function NoodlesOrderForm({ noodlesMenu }: NoodlesOrderFormProps) {
    const noodlesMenuMain = noodlesMenu.filter((noodles) => noodles.category === "main");
    const noodlesMenuAddOns = noodlesMenu.filter((noodles) => noodles.category === "addOn");

    return (
        <Section title={`揀樣${NoodlesCategories.main}先`}>
            {noodlesMenuMain.map((noodles) => (
                <NoodlesOrderFormItem key={noodles.id} noodles={noodles} addOns={noodlesMenuAddOns} />
            ))}
        </Section>
    );
}
