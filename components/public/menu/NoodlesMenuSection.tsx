import { NoodlesCategories, NoodlesCategory, NoodlesItem } from "@/types/Menu";

interface NoodlesMenuSectionProps {
    menu: NoodlesItem[];
    category: NoodlesCategory;
}

export default function NoodlesMenuSection({ menu, category }: NoodlesMenuSectionProps) {
    return (
        <article className="border rounded p-4 flex flex-col gap-4">
            <h1 className="text-lg text-center">{NoodlesCategories[category]}</h1>
            {menu
                .filter((noodle) => noodle.category === category)
                .map((noodle) => (
                    <p key={noodle.id} className="flex justify-between gap-4">
                        <span>{noodle.name}</span>
                        <span>${noodle.price}</span>
                    </p>
                ))}
        </article>
    );
}
