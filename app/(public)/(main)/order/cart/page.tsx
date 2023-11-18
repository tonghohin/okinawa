import ShoppingCartNoodlesSection from "@/components/public/order/cart/ShoppingCartNoodlesSection";
import ShoppingCartRiceSection from "@/components/public/order/cart/ShoppingCartRiceSection";
import ShoppingCartSnacksSection from "@/components/public/order/cart/ShoppingCartSnacksSection";
import Total from "@/components/public/order/Total";

export default function Cart() {
    return (
        <section className="flex flex-col gap-4">
            <Total />
            <ShoppingCartRiceSection />
            <ShoppingCartNoodlesSection />
            <ShoppingCartSnacksSection />
        </section>
    );
}
