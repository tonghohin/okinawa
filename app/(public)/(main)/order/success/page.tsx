import Section from "@/components/Section";
import OrderDetails from "@/components/public/order/confirm/OrderDetails";
import orderConfirmed from "@/public/orderConfirmed.svg";
import Image from "next/image";

export default function Success() {
    return (
        <Section backgroundColor="bg-yellow-400" center padding>
            <h1 className="text-lg">多謝幫襯！</h1>
            <OrderDetails />
            <Image src={orderConfirmed} width={300} height={200} alt="Order confirmed" priority />
        </Section>
    );
}
