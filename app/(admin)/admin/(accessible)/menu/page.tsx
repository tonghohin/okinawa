import FirestoreService from "@/services/FirestoreService";

export default async function AdminMenu() {
    const riceMenu = await FirestoreService.getRiceMenu();
    console.log("AdminMenu --- riceMenu", riceMenu);

    return <div>AdminMenu</div>;
}
