import { Utilities } from "@/Utilities/Utilities";
import Accordion from "@/components/Accordion";
import ChipButton from "@/components/ChipButton";
import Loading from "@/components/Loading";
import PulsingDot from "@/components/PulsingDot";
import ShoppingCartSection from "@/components/public/order/cart/ShoppingCartSection";
import { Order } from "@/schemas/Order";
import FirestoreService from "@/services/FirestoreService";
import { useState } from "react";

interface OrderCardProps {
    order: Order.Frontend.Form.Type;
    setOrders: React.Dispatch<React.SetStateAction<Order.Frontend.Form.Type[]>>;
    completed: boolean;
    newOrderId: string[];
}

export default function OrderCard({ order, setOrders, completed, newOrderId }: OrderCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleCompleteOrder() {
        if (order.id) {
            setIsDeleting(true);
            await FirestoreService.updateOrder(order.id, { delivered: true });
            setOrders((prevOrders) => prevOrders.filter((prevOrder) => prevOrder.id !== order.id));
        }
    }

    return (
        <section className={`flex flex-col gap-4 bg-yellow-500 rounded p-4 ${order.delivered && "opacity-60"}`}>
            <div className="flex justify-between items-center">
                <p className="flex-1">{order.id && newOrderId.includes(order.id) && <PulsingDot />}</p>
                <p className="flex gap-2">
                    <span>{order.date.toLocaleDateString()}</span>
                    <span>{order.date.toLocaleTimeString()}</span>
                </p>
            </div>
            <p>
                訂單編號：{order.id} （{order.delivery ? "送餐" : "自取"}）
            </p>
            <p>名字：{order.name}</p>
            <p>電話：{order.phone}</p>
            <p>Email: {order.email}</p>
            {order.address && <p>地址：{Utilities.getAddressLine(order.address)}</p>}
            <p>Total: ${order.total}</p>
            <Accordion title="訂單詳情">
                <ShoppingCartSection category="rice" preservedOrderFormData={order} />
                <ShoppingCartSection category="noodles" preservedOrderFormData={order} />
                <ShoppingCartSection category="snacks" preservedOrderFormData={order} />
            </Accordion>
            {/* <ChipLink href={`/admin/orders/${order.id}`} className="bg-yellow-600">
                更改訂單
            </ChipLink> */}
            {!completed && order.id && (
                <ChipButton className="bg-green-700" onClick={handleCompleteOrder}>
                    {isDeleting ? <Loading /> : <span>完成訂單</span>}
                </ChipButton>
            )}
        </section>
    );
}
