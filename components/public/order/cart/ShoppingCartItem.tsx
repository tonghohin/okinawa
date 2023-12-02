import { Menu } from "@/schemas/Menu";
import { Order } from "@/schemas/Order";
import useOrderFormDataStore from "@/stores/orderFormDataStore";
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
    const updateOrderItemQuantity = useOrderFormDataStore((state) => state.updateOrderItemQuantity);

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
                                <button type="button" className="hover:bg-yellow-500 rounded-full" onClick={() => updateOrderItemQuantity(false, index, category)}>
                                    <IconTrash color="#854d0e" size={24} />
                                </button>
                            ) : (
                                <button type="button" className="hover:bg-yellow-500 rounded-full">
                                    <IconMinus color="#854d0e" size={24} onClick={() => updateOrderItemQuantity(false, index, category)} />
                                </button>
                            )}
                            <span>{orderItem.quantity}</span>
                            <button type="button" className="hover:bg-yellow-500 rounded-full">
                                <IconPlus color="#854d0e" size={24} onClick={() => updateOrderItemQuantity(true, index, category)} />
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
