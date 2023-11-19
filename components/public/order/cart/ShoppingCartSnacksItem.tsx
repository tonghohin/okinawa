import { useOrderFormData, useSetOrderFormData } from "@/contexts/OrderFormContextProvider";
import { Tools } from "@/tools/Tools";
import { SnacksOrderItem } from "@/types/Order";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";

interface ShoppingCartSnacksItemProps {
    snacksOrderItem: SnacksOrderItem.Frontend;
    index: number;
}

export default function ShoppingCartSnacksItem({ snacksOrderItem, index }: ShoppingCartSnacksItemProps) {
    const setOrderFormData = useSetOrderFormData();

    function handleQuantityChange(increment: boolean) {
        if (setOrderFormData) {
            if (increment) {
                setOrderFormData((prevOrderFormData) => ({
                    ...prevOrderFormData,
                    items: {
                        ...prevOrderFormData.items,
                        snacks: prevOrderFormData.items.snacks.map((snacksOrderItem, i) => {
                            if (i === index) {
                                return {
                                    ...snacksOrderItem,
                                    quantity: snacksOrderItem.quantity + 1
                                };
                            } else {
                                return snacksOrderItem;
                            }
                        })
                    }
                }));
            } else {
                if (snacksOrderItem.quantity === 1) {
                    setOrderFormData((prevOrderFormData) => ({
                        ...prevOrderFormData,
                        items: {
                            ...prevOrderFormData.items,
                            snacks: prevOrderFormData.items.snacks.filter((snacksOrderItem, i) => i !== index)
                        }
                    }));
                } else {
                    setOrderFormData((prevOrderFormData) => ({
                        ...prevOrderFormData,
                        items: {
                            ...prevOrderFormData.items,
                            snacks: prevOrderFormData.items.snacks.map((snacksOrderItem, i) => {
                                if (i === index) {
                                    return {
                                        ...snacksOrderItem,
                                        quantity: snacksOrderItem.quantity - 1
                                    };
                                } else {
                                    return snacksOrderItem;
                                }
                            })
                        }
                    }));
                }
            }
        }
    }

    return (
        <div className="cursor-pointer">
            <p className="flex justify-between items-center">
                <p className="flex gap-1 items-center">
                    <span>{index + 1}.</span>
                    <span>{snacksOrderItem.item.name}</span>
                </p>
                <p className="flex gap-2 items-center">
                    <span>${Tools.Frontend.getSnacksOrderSubtotal(snacksOrderItem)}</span>
                    <span className="flex gap-2 rounded-full px-2 py-1 border border-yellow-500">
                        {snacksOrderItem.quantity === 1 ? (
                            <button type="button" className="hover:bg-yellow-500 rounded-full" onClick={() => handleQuantityChange(false)}>
                                <IconTrash className="text-yellow-800" size={24} />
                            </button>
                        ) : (
                            <button type="button" className="hover:bg-yellow-500 rounded-full">
                                <IconMinus className="text-yellow-800" size={24} onClick={() => handleQuantityChange(false)} />
                            </button>
                        )}
                        <span>{snacksOrderItem.quantity}</span>
                        <button type="button" className="hover:bg-yellow-500 rounded-full">
                            <IconPlus className="text-yellow-800" size={24} onClick={() => handleQuantityChange(true)} />
                        </button>
                    </span>
                </p>
            </p>
        </div>
    );
}
