import { RiceCategories, RiceCategory, RiceItem } from "@/types/Menu";

interface RiceMenuSectionProps {
    menu: RiceItem[];
    category: RiceCategory;
}

export default function RiceOrderFormSection({ menu, category }: RiceMenuSectionProps) {
    return (
        <article className="border rounded p-4 flex flex-col gap-2">
            <h1 className="text-lg text-center">{RiceCategories[category]}</h1>
            {menu
                .filter((rice) => rice.category === category)
                .map((rice) => (
                    <p key={rice.id} className="flex justify-between gap-2">
                        <span>{rice.name}</span>
                        <span>${rice.price}</span>
                    </p>
                ))}
        </article>
    );
}
