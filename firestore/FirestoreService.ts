import { db } from "@/firebase/configuration";
import { collection, doc, getDocs, writeBatch } from "firebase/firestore";
import { RiceItem, SnackItem } from "../types/Menu";

export default class FirestoreService {
    private static instance: FirestoreService;

    private constructor() {}

    public static getInstance(): FirestoreService {
        if (!FirestoreService.instance) {
            FirestoreService.instance = new FirestoreService();
        }
        return FirestoreService.instance;
    }

    public async getRiceMenu(): Promise<RiceItem[]> {
        const riceData = await getDocs(collection(db, "rice"));
        return riceData.docs.map((rice) => {
            return {
                id: rice.id,
                category: rice.data().category,
                name: rice.data().name,
                price: rice.data().price
            };
        });
    }

    public async getSnacksMenu(): Promise<SnackItem[]> {
        const riceData = await getDocs(collection(db, "snacks"));
        return riceData.docs.map((rice) => {
            return {
                id: rice.id,
                name: rice.data().name,
                price: rice.data().price
            };
        });
    }

    public async addDocs() {
        const data = [
            { name: "日本南瓜可樂餅", price: 20 },
            { name: "日本和牛可樂餅", price: 25 },
            { name: "一口燒小甘薯（10件）", price: 20 },
            { name: "日本芝士年糕", price: 28 },
            { name: "日本蟹肉忌廉薯餅", price: 28 },
            { name: "日本雞皮餃子（10件）", price: 30 },
            { name: "玉子燒", price: 15 },
            { name: "唐揚炸雞（50件）", price: 30 },
            { name: "香烤雞泡魚乾", price: 40 },
            { name: "台灣夜市甜不辣", price: 35 },
            { name: "香芋地瓜球", price: 30 },
            { name: "流心芝士火腿吉列豬堡", price: 38 },
            { name: "日式炸蝦（4件）", price: 30 },
            { name: "炸豚肉餃子（6件）", price: 25 },
            { name: "香脆日本冰花餃子（6件）", price: 40 }
        ];

        const collectionRef = collection(db, "snacks");
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
