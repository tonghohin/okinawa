import { SnackItem } from "@/types/Menu";
import SnacksOrderFormItem from "./SnacksOrderFormItem";

interface SnacksOrderFormProps {
    snacksMenu: SnackItem[];
}

export default function SnacksOrderForm({ snacksMenu }: SnacksOrderFormProps) {
    return (
        <section className="border border-yellow-600 rounded p-4 flex flex-col gap-4">
            {snacksMenu.map((snack) => (
                <SnacksOrderFormItem key={snack.id} snack={snack} />
            ))}
        </section>
    );
}
