import { Utilities } from "@/Utilities/Utilities";
import Accordion from "@/components/Accordion";
import ShoppingCartSection from "@/components/public/order/cart/ShoppingCartSection";
import { Order } from "@/schemas/Order";
import CompleteOrder from "./CompleteOrder";

interface OrderCardProps {
    order: Order.Frontend.Form.Type;
    completed: boolean;
}

export default function OrderCard({ order, completed }: OrderCardProps) {
    return (
        <section className={`flex flex-col gap-4 bg-yellow-500 rounded p-4 ${order.delivered && "opacity-60"}`}>
            <p className="flex justify-between">
                <span>
                    訂單編號：{order.id} （{order.delivery ? "送餐" : "自取"}）
                </span>
                <p className="flex gap-2">
                    <span>{order.date.toLocaleDateString()}</span>
                    <span>{order.date.toLocaleTimeString()}</span>
                </p>
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
            {!completed && order.id && <CompleteOrder orderId={order.id} />}
        </section>
    );
}
