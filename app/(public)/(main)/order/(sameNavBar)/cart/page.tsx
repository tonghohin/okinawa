import Section from "@/components/Section";
import ShoppingCartSection from "@/components/public/order/cart/ShoppingCartSection";

export default function Cart() {
    return (
        <Section title="購物車">
            <ShoppingCartSection category="rice" />
            <ShoppingCartSection category="noodles" />
            <ShoppingCartSection category="snacks" />
        </Section>
    );
}
