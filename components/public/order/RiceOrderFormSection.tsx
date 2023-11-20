import { RiceCategories, RiceCategory, RiceItem } from "@/types/Menu";
import RiceOrderFormItem from "./RiceOrderFormItem";
import Section from "@/components/Section";

interface RiceMenuSectionProps {
    menu: RiceItem[];
    category: RiceCategory;
}

export default function RiceOrderFormSection({ menu, category }: RiceMenuSectionProps) {
    const addOns = menu.filter((rice) => rice.category === "addOn");

    return (
        <Section title={RiceCategories[category]}>
            {menu
                .filter((rice) => rice.category === category)
                .map((rice) => (
                    <RiceOrderFormItem key={rice.id} rice={rice} addOns={addOns} />
                ))}
        </Section>
    );
}
