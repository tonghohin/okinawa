import { SnackItem } from "@/types/Menu";

interface SnacksMenuProps {
    snacksMenu: SnackItem[];
}

export default function SnacksMenu({ snacksMenu }: SnacksMenuProps) {
    return (
        <section className="border rounded p-4 flex flex-col gap-4">
            {snacksMenu.map((snack) => (
                <p key={snack.id} className="flex justify-between gap-4">
                    <span>{snack.name}</span>
                    <span>${snack.price}</span>
                </p>
            ))}
        </section>
    );
}
