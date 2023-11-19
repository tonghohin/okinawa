import ShoppingCartNoodlesSection from "@/components/public/order/cart/ShoppingCartNoodlesSection";
import ShoppingCartRiceSection from "@/components/public/order/cart/ShoppingCartRiceSection";
import ShoppingCartSnacksSection from "@/components/public/order/cart/ShoppingCartSnacksSection";

export default function Cart() {
    return (
        <section className="flex flex-col gap-2">
            <ShoppingCartRiceSection />
            <ShoppingCartNoodlesSection />
            <ShoppingCartSnacksSection />
        </section>
    );
}
