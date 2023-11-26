import { Utilities } from "@/Utilities/Utilities";
import Accordion from "@/components/Accordion";
import Section from "@/components/Section";
import ShoppingCartSection from "@/components/public/order/cart/ShoppingCartSection";
import FirestoreService from "@/services/FirestoreService";

export default async function AdminOrders() {
    const orders = await FirestoreService.getOrders();

    return (
        <Section padding>
            {orders.map((order) => (
                <section key={order.id} className="flex flex-col gap-4 bg-yellow-500 rounded p-4">
                    <p className="flex justify-between">
                        <span>
                            訂單編號：{order.id} （{order.delivery ? "送餐" : "自取"}）
                        </span>
                        <span>{order.date.toLocaleDateString()}</span>
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
                </section>
            ))}
        </Section>
    );
}
