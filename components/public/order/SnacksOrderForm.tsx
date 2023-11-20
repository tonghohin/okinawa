import { SnacksItem } from "@/types/Menu";
import SnacksOrderFormItem from "./SnacksOrderFormItem";
import Section from "@/components/Section";

interface SnacksOrderFormProps {
    snacksMenu: SnacksItem[];
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
