import { SnacksItem } from "@/types/Menu";
import SnacksOrderFormItem from "./SnacksOrderFormItem";

interface SnacksOrderFormProps {
    snacksMenu: SnacksItem[];
}

export default function SnacksOrderForm({ snacksMenu }: SnacksOrderFormProps) {
    return (
        <section className="flex flex-col gap-4">
            {snacksMenu.map((snack) => (
                <SnacksOrderFormItem key={snack.id} snack={snack} />
            ))}
        </section>
    );
}
