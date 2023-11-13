import FirestoreService from "@/firestore/FirestoreService";

export default async function AdminMenu() {
    const riceMenu = await FirestoreService.getInstance().getRiceMenu();
    console.log("AdminMenu --- riceMenu", riceMenu);

    return <div>AdminMenu</div>;
}
