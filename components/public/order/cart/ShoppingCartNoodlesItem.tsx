import { useOrderFormData, useSetOrderFormData } from "@/contexts/OrderFormContextProvider";
import { Tools } from "@/tools/Tools";
import { NoodlesCategories } from "@/types/Menu";
import { NoodlesOrderItem } from "@/types/Order";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";

interface ShoppingCartNoodlesItemProps {
    noodlesOrderItem: NoodlesOrderItem.Frontend;
    index: number;
}

export default function ShoppingCartNoodlesItem({ noodlesOrderItem, index }: ShoppingCartNoodlesItemProps) {
    const setOrderFormData = useSetOrderFormData();

    function handleQuantityChange(increment: boolean) {
        if (setOrderFormData) {
            if (increment) {
                setOrderFormData((prevOrderFormData) => ({
                    ...prevOrderFormData,
                    items: {
                        ...prevOrderFormData.items,
                        noodles: prevOrderFormData.items.noodles.map((noodlesOrderItem, i) => {
                            if (i === index) {
                                return {
                                    ...noodlesOrderItem,
                                    quantity: noodlesOrderItem.quantity + 1
                                };
                            } else {
                                return noodlesOrderItem;
                            }
                        })
                    }
                }));
            } else {
                if (noodlesOrderItem.quantity === 1) {
                    setOrderFormData((prevOrderFormData) => ({
                        ...prevOrderFormData,
                        items: {
                            ...prevOrderFormData.items,
                            noodles: prevOrderFormData.items.noodles.filter((noodlesOrderItem, i) => i !== index)
                        }
                    }));
                } else {
                    setOrderFormData((prevOrderFormData) => ({
                        ...prevOrderFormData,
                        items: {
                            ...prevOrderFormData.items,
                            noodles: prevOrderFormData.items.noodles.map((noodlesOrderItem, i) => {
                                if (i === index) {
                                    return {
                                        ...noodlesOrderItem,
                                        quantity: noodlesOrderItem.quantity - 1
                                    };
                                } else {
                                    return noodlesOrderItem;
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
                    <span>{noodlesOrderItem.item.name}</span>
                </p>
                <p className="flex gap-2 items-center">
                    <span>${Tools.Frontend.getNoodlesOrderSubtotal(noodlesOrderItem)}</span>
                    <span className="flex gap-2 rounded-full px-2 py-1 border border-yellow-500">
                        {noodlesOrderItem.quantity === 1 ? (
                            <button className="hover:bg-yellow-500 rounded-full" onClick={() => handleQuantityChange(false)}>
                                <IconTrash className="text-yellow-800" size={24} />
                            </button>
                        ) : (
                            <button className="hover:bg-yellow-500 rounded-full">
                                <IconMinus className="text-yellow-800" size={24} onClick={() => handleQuantityChange(false)} />
                            </button>
                        )}
                        <span>{noodlesOrderItem.quantity}</span>
                        <button className="hover:bg-yellow-500 rounded-full">
                            <IconPlus className="text-yellow-800" size={24} onClick={() => handleQuantityChange(true)} />
                        </button>
                    </span>
                </p>
            </p>
            {noodlesOrderItem.addOns.length > 0 && (
                <p className="text-sm">
                    <span>（{NoodlesCategories.addOn}：</span>
                    {noodlesOrderItem.addOns.map((addOn, index) => (
                        <span key={addOn.id}>
                            {addOn.name}
                            {index === noodlesOrderItem.addOns.length - 1 ? "）" : "，"}
                        </span>
                    ))}
                </p>
            )}
        </div>
    );
}
