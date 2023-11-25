import FirestoreService from "@/services/FirestoreService";

export default function AdminOrders() {
    const orders = FirestoreService.getOrders();

    return <div>AdminOrders</div>;
}
