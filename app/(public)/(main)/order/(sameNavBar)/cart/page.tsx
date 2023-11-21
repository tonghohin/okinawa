import ShoppingCartSection from "@/components/public/order/cart/ShoppingCartSection";

export default function Cart() {
    return (
        <section className="flex flex-col gap-2">
            <ShoppingCartSection category="rice" />
            <ShoppingCartSection category="noodles" />
            <ShoppingCartSection category="snacks" />
        </section>
    );
}
