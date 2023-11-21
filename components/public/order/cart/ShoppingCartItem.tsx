import { useSetOrderFormData } from "@/contexts/OrderFormContextProvider";
import { Menu } from "@/schemas/Menu";
import { Order } from "@/schemas/Order";
import { Tools } from "@/tools/Tools";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";

interface ShoppingCartNoodlesItemProps {
    index: number;
    category: Menu.Categories.Type;
    orderItem: Order.NoodlesItem.Frontend.Type | Order.RiceItem.Frontend.Type | Order.SnacksItem.Frontend.Type;
    children?: React.ReactNode;
}

export default function ShoppingCartItem({ index, category, orderItem, children }: ShoppingCartNoodlesItemProps) {
    const setOrderFormData = useSetOrderFormData();

    function handleQuantityChange(increment: boolean) {
        if (setOrderFormData) {
            if (increment) {
                setOrderFormData((prevOrderFormData) => ({
                    ...prevOrderFormData,
                    items: {
                        ...prevOrderFormData.items,
                        [category]: prevOrderFormData.items[category].map((orderItem, i) => {
                            if (i === index) {
                                return {
                                    ...orderItem,
                                    quantity: orderItem.quantity + 1
                                };
                            } else {
                                return orderItem;
                            }
                        })
                    }
                }));
            } else {
                if (orderItem.quantity === 1) {
                    setOrderFormData((prevOrderFormData) => ({
                        ...prevOrderFormData,
                        items: {
                            ...prevOrderFormData.items,
                            [category]: prevOrderFormData.items[category].filter((orderItem, i) => i !== index)
                        }
                    }));
                } else {
                    setOrderFormData((prevOrderFormData) => ({
                        ...prevOrderFormData,
                        items: {
                            ...prevOrderFormData.items,
                            [category]: prevOrderFormData.items[category].map((orderItem, i) => {
                                if (i === index) {
                                    return {
                                        ...orderItem,
                                        quantity: orderItem.quantity - 1
                                    };
                                } else {
                                    return orderItem;
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
            <div className="flex justify-between items-center">
                <p className="flex gap-1 items-center">
                    <span>{index + 1}.</span>
                    <span>{orderItem.item.name}</span>
                </p>
                <p className="flex gap-2 items-center">
                    <span>${Tools.Frontend.getOrderSubtotal(orderItem)}</span>
                    <span className="flex gap-2 rounded-full px-2 py-1 border border-yellow-500">
                        {orderItem.quantity === 1 ? (
                            <button type="button" className="hover:bg-yellow-500 rounded-full" onClick={() => handleQuantityChange(false)}>
                                <IconTrash className="text-yellow-800" size={24} />
                            </button>
                        ) : (
                            <button type="button" className="hover:bg-yellow-500 rounded-full">
                                <IconMinus className="text-yellow-800" size={24} onClick={() => handleQuantityChange(false)} />
                            </button>
                        )}
                        <span>{orderItem.quantity}</span>
                        <button type="button" className="hover:bg-yellow-500 rounded-full">
                            <IconPlus className="text-yellow-800" size={24} onClick={() => handleQuantityChange(true)} />
                        </button>
                    </span>
                </p>
            </div>
            {children}
        </div>
    );
}
