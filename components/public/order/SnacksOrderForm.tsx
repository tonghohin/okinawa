import Section from "@/components/Section";
import { Menu } from "@/schemas/Menu";
import SnacksOrderFormItem from "./SnacksOrderFormItem";

interface SnacksOrderFormProps {
    snacksMenu: Menu.Snacks.Item.Type[];
}

export default function SnacksOrderForm({ snacksMenu }: SnacksOrderFormProps) {
    return (
        <Section>
            {snacksMenu.map((snack) => (
                <SnacksOrderFormItem key={snack.id} snack={snack} />
            ))}
        </Section>
    );
}
