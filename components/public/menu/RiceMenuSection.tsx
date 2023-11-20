import Section from "@/components/Section";
import { RiceCategories, RiceCategory, RiceItem } from "@/types/Menu";

interface RiceMenuSectionProps {
    menu: RiceItem[];
    category: RiceCategory;
}

export default function RiceMenuSection({ menu, category }: RiceMenuSectionProps) {
    return (
        <Section title={RiceCategories[category]}>
            {menu
                .filter((rice) => rice.category === category)
                .map((rice) => (
                    <p key={rice.id} className="flex justify-between gap-4">
                        <span>{rice.name}</span>
                        <span>${rice.price}</span>
                    </p>
                ))}
        </Section>
    );
}
