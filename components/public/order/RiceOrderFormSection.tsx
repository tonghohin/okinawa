import { Menu } from "@/schemas/Menu";
import RiceOrderFormItem from "./RiceOrderFormItem";
import Section from "@/components/Section";

interface RiceMenuSectionProps {
    menu: Menu.Rice.Item.Type[];
    category: Menu.Rice.Categories.Type;
}

export default function RiceOrderFormSection({ menu, category }: RiceMenuSectionProps) {
    const addOns = menu.filter((rice) => rice.category === "addOn");

    return (
        <Section title={Menu.Rice.Categories.Mapping[category]}>
            {menu
                .filter((rice) => rice.category === category)
                .map((rice) => (
                    <RiceOrderFormItem key={rice.id} rice={rice} addOns={addOns} />
                ))}
        </Section>
    );
}
