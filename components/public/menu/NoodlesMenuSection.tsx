import Section from "@/components/Section";
import { NoodlesCategories, NoodlesCategory, NoodlesItem } from "@/types/Menu";

interface NoodlesMenuSectionProps {
    menu: NoodlesItem[];
    category: NoodlesCategory;
}

export default function NoodlesMenuSection({ menu, category }: NoodlesMenuSectionProps) {
    return (
        <Section title={NoodlesCategories[category]}>
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
