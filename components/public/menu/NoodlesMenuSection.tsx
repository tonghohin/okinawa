import Section from "@/components/Section";
import { Menu } from "@/schemas/Menu";

interface NoodlesMenuSectionProps {
    menu: Menu.Noodles.Item.Type[];
    category: Menu.Noodles.Categories.Type;
}

export default function NoodlesMenuSection({ menu, category }: NoodlesMenuSectionProps) {
    return (
        <Section title={Menu.Noodles.Categories.Mapping[category]}>
            {menu
                .filter((noodle) => noodle.category === category)
                .map((noodle) => (
                    <p key={noodle.id} className="flex justify-between gap-4">
                        <span>{noodle.name}</span>
                        <span>${noodle.price}</span>
                    </p>
                ))}
        </Section>
    );
}
