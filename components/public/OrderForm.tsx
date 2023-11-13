import { RiceItem } from "@/types/Menu";

interface OrderFormProps {
    riceMenu: RiceItem[];
}

export default function OrderForm({ riceMenu }: OrderFormProps) {
    return (
        <section>
            <h1>Rice</h1>
        </section>
    );
}
