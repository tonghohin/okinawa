import Section from "@/components/Section";
import OrderCard from "@/components/admin/order/OrderCard";
import FirestoreService from "@/services/FirestoreService";

export default async function OldOrders() {
    const oldOrders = await FirestoreService.getOldOrders();

    return (
        <Section padding>
            {oldOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
            ))}
        </Section>
    );
}
