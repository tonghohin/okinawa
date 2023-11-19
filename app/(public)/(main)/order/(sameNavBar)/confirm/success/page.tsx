import Image from "next/image";
import orderConfirmed from "@/public/orderConfirmed.svg";

export default function Success() {
    return (
        <section className="bg-yellow-400 p-4 flex flex-col gap-4 items-center">
            <h1 className="text-lg">多謝幫襯！</h1>
            <Image src={orderConfirmed} alt="Order confirmed" priority />
        </section>
    );
}
