import FirestoreQuery from "@/app/firestore/FirestoreQuery";

// await addDoc(collection(db, pathToRiceDocument, "eel"), {
//     name: "牛肉烤雞炙燒豚肉蒲燒鰻魚溫泉蛋溏心蛋唐揚炸雞雞皮餃子炸海老咖哩日本南瓜和牛可樂餅蟹肉忌廉薯餅流心芝士火腿吉列豬堡雙拼丼",
//     price: 75
// });

export default async function AdminMenu() {
    const riceMenu = await FirestoreQuery.getInstance().getRiceMenu();
    console.log("AdminMenu --- riceMenu", riceMenu);

    return <div>AdminMenu</div>;
}
