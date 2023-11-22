import CircleButton from "@/components/CircleButton";
import { useOrderFormData } from "@/contexts/OrderFormContextProvider";
import { Menu } from "@/schemas/Menu";
import { Tools } from "@/tools/Tools";
import { IconPlus } from "@tabler/icons-react";
import { useMemo } from "react";

interface OrderFormItemProps {
    orderItem: Menu.Rice.Item.Type | Menu.Noodles.Item.Type | Menu.Snacks.Item.Type;
    orderItemCategory: Menu.Categories.Type;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OrderFormItem({ orderItem, orderItemCategory, setIsModalOpen }: OrderFormItemProps) {
    const orderFormData = useOrderFormData();
    const itemCount = useMemo(() => (orderFormData ? Tools.Frontend.getNumberOfItems(orderFormData.items, orderItemCategory, orderItem.id) : 0), [orderFormData]);

    return (
        <section className="flex gap-4 items-center justify-between border border-yellow-500 rounded p-2 cursor-pointer hover:bg-yellow-500 transition-all" onClick={() => setIsModalOpen(true)}>
            <span>{orderItem.name}</span>
            <div className="flex items-center gap-4">
                {itemCount > 0 && (
                    <div className="flex items-center justify-center w-6 h-6 text-xs rounded-full bg-sky-700/80 text-neutral-50">
                        <span>{itemCount}</span>
                    </div>
                )}
                <span>${orderItem.price}</span>
                <CircleButton className="bg-yellow-500">
                    <IconPlus size={18} />
                </CircleButton>
            </div>
        </section>
    );
}
