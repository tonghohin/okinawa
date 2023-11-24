import FirestoreService from "@/services/FirestoreService";

export default function AdminOrders() {
    const orders = FirestoreService.getInstance().getOrders();

    return <div>AdminOrders</div>;
}
