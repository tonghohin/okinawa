import Section from "@/components/Section";
import { Menu } from "@/schemas/Menu";
import NoodlesOrderFormItem from "./NoodlesOrderFormItem";

interface NoodlesOrderFormProps {
    noodlesMenu: Menu.Noodles.Item.Type[];
}

export default function NoodlesOrderForm({ noodlesMenu }: NoodlesOrderFormProps) {
    const noodlesMenuMain = noodlesMenu.filter((noodles) => noodles.category === "main");
    const noodlesMenuAddOns = noodlesMenu.filter((noodles) => noodles.category === "addOn");

    return (
        <Section title={`揀樣${Menu.Noodles.Categories.Mapping.main}先`}>
            {noodlesMenuMain.map((noodles) => (
                <NoodlesOrderFormItem key={noodles.id} noodles={noodles} addOns={noodlesMenuAddOns} />
            ))}
        </Section>
    );
}
