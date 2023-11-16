import { useOrderFormData } from "@/contexts/OrderFormContextProvider";
import { RiceCategories, RiceCategory, RiceItem } from "@/types/Menu";
import { IconPlus } from "@tabler/icons-react";
import RicePopUp from "./RicePopUp";

interface RiceMenuSectionProps {
    menu: RiceItem[];
    category: RiceCategory;
}

export default function RiceOrderFormSection({ menu, category }: RiceMenuSectionProps) {
    const orderFormData = useOrderFormData();

    return (
        <article className="border border-yellow-600 rounded p-4 flex flex-col gap-4">
            <h1 className="text-lg text-center">{RiceCategories[category]}</h1>
            {menu
                .filter((rice) => rice.category === category)
                .map((rice) => (
                    <p key={rice.id} className="flex gap-4 items-center justify-between border border-yellow-500 rounded p-2 cursor-pointer hover:bg-yellow-500 transition-all">
                        <span>{rice.name}</span>
                        <div className="flex items-center gap-4">
                            <span>${rice.price}</span>
                            {/* <span className="rounded-full p-1 bg-zinc-600 opacity-90">{orderFormData?.items.rice.filter((item) => item.id === rice.id).length || 0}</span> */}
                            <IconPlus className="rounded-full p-1 bg-yellow-500" />
                        </div>
                        <RicePopUp selectedRice={rice} />
                    </p>
                ))}
        </article>
    );
}
