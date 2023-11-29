import { useSetOrderFormData } from "@/contexts/public/OrderFormContextProvider";
import { Menu } from "@/schemas/Menu";
import { Order } from "@/schemas/Order";
import { Tools } from "@/tools/Tools";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";

interface ShoppingCartNoodlesItemProps {
    index: number;
    category: Menu.Categories.Type;
    orderItem: Order.NoodlesItem.Frontend.Type | Order.RiceItem.Frontend.Type | Order.SnacksItem.Frontend.Type;
    editable?: boolean;
    children?: React.ReactNode;
}

export default function ShoppingCartItem({ index, category, orderItem, editable, children }: ShoppingCartNoodlesItemProps) {
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
        <div className={`${editable && "cursor-pointer"}`}>
            <div className="flex justify-between items-center">
                <span>
                    {index + 1}. {orderItem.item.name}
                </span>
                <p className="flex gap-2 items-center">
                    <span>${Tools.Frontend.getEachItemPrice(orderItem)}</span>
                    {editable ? (
                        <span className="flex gap-2 rounded-full px-2 py-1 border border-yellow-500">
                            {orderItem.quantity === 1 ? (
                                <button type="button" className="hover:bg-yellow-500 rounded-full" onClick={() => handleQuantityChange(false)}>
                                    <IconTrash color="#854d0e" size={24} />
                                </button>
                            ) : (
                                <button type="button" className="hover:bg-yellow-500 rounded-full">
                                    <IconMinus color="#854d0e" size={24} onClick={() => handleQuantityChange(false)} />
                                </button>
                            )}
                            <span>{orderItem.quantity}</span>
                            <button type="button" className="hover:bg-yellow-500 rounded-full">
                                <IconPlus color="#854d0e" size={24} onClick={() => handleQuantityChange(true)} />
                            </button>
                        </span>
                    ) : (
                        <span>x {orderItem.quantity}</span>
                    )}
                </p>
            </div>
            {children}
        </div>
    );
}
