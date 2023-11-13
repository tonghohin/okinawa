import OrderForm from "@/components/public/OrderForm";
import FirestoreService from "@/firestore/FirestoreService";

export default async function Order() {
    const riceMenu = await FirestoreService.getInstance().getRiceMenu();

    return (
        <main className="bg-yellow-400 rounded p-4">
            <OrderForm riceMenu={riceMenu} />
        </main>
    );
}
