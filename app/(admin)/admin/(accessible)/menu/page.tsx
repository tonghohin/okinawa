import FirestoreQuery from "@/app/firestore/FirestoreQuery";

export default async function AdminMenu() {
    const riceMenu = await FirestoreQuery.getInstance().getRiceMenu();
    console.log("AdminMenu --- riceMenu", riceMenu);

    return <div>AdminMenu</div>;
}
