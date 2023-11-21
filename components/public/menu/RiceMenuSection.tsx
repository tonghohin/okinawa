import Section from "@/components/Section";
import { Menu } from "@/schemas/Menu";

interface RiceMenuSectionProps {
    menu: Menu.Rice.Item.Type[];
    category: Menu.Rice.Categories.Type;
}

export default function RiceMenuSection({ menu, category }: RiceMenuSectionProps) {
    return (
        <Section title={Menu.Rice.Categories.Mapping[category]}>
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
