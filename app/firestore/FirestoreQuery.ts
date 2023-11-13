import { db } from "@/firebase/configuration";
import { collection, doc, getDocs, writeBatch } from "firebase/firestore";
import { RiceItem } from "../types/Menu";

export default class FirestoreQuery {
    private static instance: FirestoreQuery;
    private _pathToMenuDocument: string = "";

    private constructor() {}

    public static getInstance(): FirestoreQuery {
        if (!FirestoreQuery.instance) {
            FirestoreQuery.instance = new FirestoreQuery();
        }
        return FirestoreQuery.instance;
    }

    private async _getPathToMenuDocument() {
        if (this._pathToMenuDocument === "") {
            const querySnapshot = await getDocs(collection(db, "menu"));
            const [menuDocument] = querySnapshot.docs;
            const menuId = menuDocument.id;
            this._pathToMenuDocument = `menu/${menuId}`;
            return this._pathToMenuDocument;
        } else {
            return this._pathToMenuDocument;
        }
    }

    public async getRiceMenu(): Promise<RiceItem[]> {
        const pathToMenuDocument = await this._getPathToMenuDocument();
        const riceData = await getDocs(collection(db, pathToMenuDocument, "rice"));
        return riceData.docs.map((rice) => {
            return {
                id: rice.id,
                category: rice.data().category,
                name: rice.data().name,
                price: rice.data().price
            };
        });
    }

    public async addDocs() {
        const pathToRiceDocument = await this._getPathToMenuDocument();

        const data = [
            { category: "beef", name: "激多香蔥溫泉蛋牛肉丼", price: 65 },
            { category: "beef", name: "溏心蛋牛肉丼", price: 65 },
            { category: "beef", name: "溫泉蛋和風牛肉丼", price: 60 },
            { category: "beef", name: "和風牛肉丼", price: 58 },
            { category: "beef", name: "北海道三重芝牛肉丼", price: 70 },
            { category: "pork", name: "炙燒豚肉丼（4件）", price: 58 },
            { category: "pork", name: "激多香蔥溫泉蛋炙燒豚肉丼", price: 65 },
            { category: "pork", name: "溏心蛋炙燒豚肉丼", price: 65 },
            { category: "pork", name: "北海道三重芝豚肉丼", price: 70 },
            { category: "pork", name: "溫泉蛋炙燒豚肉丼", price: 60 },
            { category: "eel", name: "蒲燒原條鰻魚溫泉蛋丼", price: 100 },
            { category: "eel", name: "蒲燒原條鰻魚拼溏心蛋丼", price: 108 },
            { category: "eel", name: "蒲燒原條鰻魚丼", price: 98 },
            { category: "chicken", name: "溫泉蛋烤雞丼", price: 60 },
            { category: "chicken", name: "照燒烤雞丼", price: 58 },
            { category: "chicken", name: "北海道三重芝烤雞丼", price: 70 },
            { category: "chicken", name: "溏心蛋烤雞丼", price: 65 },
            { category: "chicken", name: "激多香蔥溫泉蛋烤雞丼", price: 65 },
            { category: "combo", name: "蒲燒鰻魚炙燒豚肉雙拼丼", price: 128 },
            { category: "combo", name: "炙燒豚肉烤雞雙拼丼", price: 75 },
            { category: "combo", name: "牛肉烤雞雙拼丼", price: 75 },
            { category: "combo", name: "牛肉炙燒豚肉雙拼丼", price: 75 },
            { category: "combo", name: "蒲燒鰻魚烤雞雙拼丼", price: 128 },
            { category: "combo", name: "牛肉蒲燒鰻魚雙拼丼", price: 128 },
            { category: "curry", name: "日本南瓜可樂餅咖哩丼", price: 60 },
            { category: "curry", name: "流心芝士火腿吉列豬堡咖哩丼", price: 88 },
            { category: "curry", name: "溏心蛋咖哩牛肉丼", price: 67 },
            { category: "curry", name: "日本蟹肉忌廉薯餅咖哩丼", price: 68 },
            { category: "curry", name: "咖哩牛肉丼", price: 60 },
            { category: "curry", name: "日本和牛可樂餅咖哩丼", price: 65 },
            { category: "curry", name: "炸海老咖哩丼（4件）", price: 65 },
            { category: "curry", name: "唐揚炸雞咖哩丼（4件）", price: 65 },
            { category: "curry", name: "雞皮餃子咖哩丼（3件）", price: 65 },
            { category: "curry", name: "溫泉蛋咖哩牛肉丼", price: 62 }
        ];

        const collectionRef = collection(db, "menu/aTRIUaS7nESbiWH3Hw7F/rice");
        const batch = writeBatch(db);
        for (const item of data) {
            const docRef = doc(collectionRef);
            batch.set(docRef, item);
        }
        await batch.commit();

        // await addDoc(collection(db, pathToRiceDocument), {
        //     name: "牛肉烤雞炙燒豚肉蒲燒鰻魚溫泉蛋溏心蛋唐揚炸雞雞皮餃子炸海老咖哩日本南瓜和牛可樂餅蟹肉忌廉薯餅流心芝士火腿吉列豬堡雙拼丼",
        //     price: 75
        // });
        // await addDoc(collection(db, "menu/aTRIUaS7nESbiWH3Hw7F/rice"), { type: "beef", name: "激多香蔥溫泉蛋牛肉丼", price: 65 });
    }
}
