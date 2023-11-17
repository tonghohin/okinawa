import { RiceCategories, RiceCategory, RiceItem } from "@/types/Menu";
import RiceOrderFormItem from "./RiceOrderFormItem";

interface RiceMenuSectionProps {
    menu: RiceItem[];
    category: RiceCategory;
}

export default function RiceOrderFormSection({ menu, category }: RiceMenuSectionProps) {
    const addOns = menu.filter((rice) => rice.category === "addOn");

    return (
        <article className="border border-yellow-600 rounded p-4 flex flex-col gap-4">
            <h1 className="text-lg text-center">{RiceCategories[category]}</h1>
            {menu
                .filter((rice) => rice.category === category)
                .map((rice) => (
                    <RiceOrderFormItem key={rice.id} rice={rice} addOns={addOns} />
                ))}
        </article>
    );
}
