import { NoodlesCategories, NoodlesCategory, NoodlesItem } from "@/types/Menu";
import NoodlesOrderFormItem from "./NoodlesOrderFormItem";

interface NoodlesMenuSectionProps {
    menu: NoodlesItem[];
    category: NoodlesCategory;
}

export default function NoodlesOrderFormSection({ menu, category }: NoodlesMenuSectionProps) {
    const addOns = menu.filter((rice) => rice.category === "addOn");

    return (
        <article className="border border-yellow-600 rounded p-4 flex flex-col gap-4">
            <h1 className="text-lg text-center">{NoodlesCategories[category]}</h1>
            {menu
                .filter((noodles) => noodles.category === category)
                .map((noodles) => (
                    <NoodlesOrderFormItem key={noodles.id} noodles={noodles} addOns={addOns} />
                ))}
        </article>
    );
}
