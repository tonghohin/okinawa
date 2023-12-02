import Section from "@/components/Section";
import { Menu } from "@/schemas/Menu";

interface SnacksMenuProps {
    snacksMenu: Menu.Snacks.Item.Type[];
}

export default function SnacksMenu({ snacksMenu }: SnacksMenuProps) {
    return (
        <Section>
            {snacksMenu.map((snack) => (
                <p key={snack.id} className="flex justify-between gap-4">
                    <span>{snack.name}</span>
                    <span>${snack.price}</span>
                </p>
            ))}
        </Section>
    );
}
