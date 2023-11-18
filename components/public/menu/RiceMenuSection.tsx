import { RiceCategories, RiceCategory, RiceItem } from "@/types/Menu";

interface RiceMenuSectionProps {
    menu: RiceItem[];
    category: RiceCategory;
}

export default function RiceMenuSection({ menu, category }: RiceMenuSectionProps) {
    return (
        <article className="flex flex-col gap-4">
            <h1 className="text-lg text-center border-b border-yellow-600">{RiceCategories[category]}</h1>
            {menu
                .filter((rice) => rice.category === category)
                .map((rice) => (
                    <p key={rice.id} className="flex justify-between gap-4">
                        <span>{rice.name}</span>
                        <span>${rice.price}</span>
                    </p>
                ))}
        </article>
    );
}
