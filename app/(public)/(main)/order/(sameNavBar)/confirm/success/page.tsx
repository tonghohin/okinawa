import Image from "next/image";
import orderConfirmed from "@/public/orderConfirmed.svg";
import Section from "@/components/Section";

export default function Success() {
    return (
        <Section backgroundColor="bg-yellow-400" center padding>
            <h1 className="text-lg">多謝幫襯！</h1>
            <Image src={orderConfirmed} width={300} height={200} alt="Order confirmed" priority />
        </Section>
    );
}
