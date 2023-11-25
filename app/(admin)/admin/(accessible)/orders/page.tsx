import FirestoreService from "@/services/FirestoreService";

export default async function AdminOrders() {
    const orders = await FirestoreService.getOrders();
    console.log("AdminOrders --- orders", orders);

    return <div>AdminOrders</div>;
}
