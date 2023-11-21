import { Menu } from "@/schemas/Menu";
import SnacksOrderFormItem from "./SnacksOrderFormItem";
import Section from "@/components/Section";

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
