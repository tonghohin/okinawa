import { useOrderFormData, useSetOrderFormData } from "@/contexts/OrderFormContextProvider";
import { Tools } from "@/tools/Tools";
import { RiceOrderItem } from "@/types/Order";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";

interface ShoppingCartRiceItemProps {
    riceOrderItem: RiceOrderItem.Frontend;
    index: number;
}

export default function ShoppingCartRiceItem({ riceOrderItem, index }: ShoppingCartRiceItemProps) {
    const setOrderFormData = useSetOrderFormData();

    function handleQuantityChange(increment: boolean) {
        if (setOrderFormData) {
            if (increment) {
                setOrderFormData((prevOrderFormData) => ({
                    ...prevOrderFormData,
                    items: {
                        ...prevOrderFormData.items,
                        rice: prevOrderFormData.items.rice.map((riceOrderItem, i) => {
                            if (i === index) {
                                return {
                                    ...riceOrderItem,
                                    quantity: riceOrderItem.quantity + 1
                                };
                            } else {
                                return riceOrderItem;
                            }
                        })
                    }
                }));
            } else {
                if (riceOrderItem.quantity === 1) {
                    setOrderFormData((prevOrderFormData) => ({
                        ...prevOrderFormData,
                        items: {
                            ...prevOrderFormData.items,
                            rice: prevOrderFormData.items.rice.filter((riceOrderItem, i) => i !== index)
                        }
                    }));
                } else {
                    setOrderFormData((prevOrderFormData) => ({
                        ...prevOrderFormData,
                        items: {
                            ...prevOrderFormData.items,
                            rice: prevOrderFormData.items.rice.map((riceOrderItem, i) => {
                                if (i === index) {
                                    return {
                                        ...riceOrderItem,
                                        quantity: riceOrderItem.quantity - 1
                                    };
                                } else {
                                    return riceOrderItem;
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
                    <span>{riceOrderItem.item.name}</span>
                </p>
                <p className="flex gap-2 items-center">
                    <span>${Tools.Frontend.getRiceOrderSubtotal(riceOrderItem)}</span>
                    <span className="flex gap-2 rounded-full px-2 py-1 border border-yellow-500">
                        {riceOrderItem.quantity === 1 ? (
                            <button className="hover:bg-yellow-500 rounded-full" onClick={() => handleQuantityChange(false)}>
                                <IconTrash className="text-yellow-800" size={24} />
                            </button>
                        ) : (
                            <button className="hover:bg-yellow-500 rounded-full">
                                <IconMinus className="text-yellow-800" size={24} onClick={() => handleQuantityChange(false)} />
                            </button>
                        )}
                        <span>{riceOrderItem.quantity}</span>
                        <button className="hover:bg-yellow-500 rounded-full">
                            <IconPlus className="text-yellow-800" size={24} onClick={() => handleQuantityChange(true)} />
                        </button>
                    </span>
                </p>
            </p>
            {riceOrderItem.toUdon && <p className="text-sm">（轉烏冬）</p>}
            {riceOrderItem.addOn && (
                <p className="text-sm">
                    （轉套餐：{riceOrderItem.addOn.name} ＋${riceOrderItem.addOn.price}）
                </p>
            )}
        </div>
    );
}
