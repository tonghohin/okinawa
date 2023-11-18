import { db } from "@/firebase/configuration";
import { collection, doc, getDocs, orderBy, query, writeBatch } from "firebase/firestore";
import { NoodlesItem, RiceItem, SnacksItem } from "../types/Menu";

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
        const riceData = await getDocs(query(collection(db, "rice"), orderBy("price")));
        return riceData.docs.map((rice) => {
            return {
                id: rice.id,
                category: rice.data().category,
                name: rice.data().name,
                price: rice.data().price
            };
        });
    }

    public async getSnacksMenu(): Promise<SnacksItem[]> {
        const snacksData = await getDocs(query(collection(db, "snacks"), orderBy("price")));
        return snacksData.docs.map((snack) => {
            return {
                id: snack.id,
                name: snack.data().name,
                price: snack.data().price
            };
        });
    }

    public async getNoodlesMenu(): Promise<NoodlesItem[]> {
        const noodlesData = await getDocs(query(collection(db, "noodles"), orderBy("price")));
        return noodlesData.docs.map((noodle) => {
            return {
                id: noodle.id,
                category: noodle.data().category,
                name: noodle.data().name,
                price: noodle.data().price
            };
        });
    }

    public async addDocs() {
        const data = [
            { category: "main", name: "稻庭真打鳥冬", price: 15 },
            { category: "main", name: "稻庭真打鳥冬（大盛）", price: 25 },
            { category: "main", name: "北海道野葛麵", price: 15 },
            { category: "main", name: "北海道野葛麵（大盛）", price: 25 },
            { category: "main", name: "鮮牛蒡野菜炊飯", price: 25 },

            { category: "addOn", name: "冬菇", price: 8 },
            { category: "addOn", name: "竹笛", price: 8 },
            { category: "addOn", name: "蟹棒", price: 8 },
            { category: "addOn", name: "油揚", price: 8 },
            { category: "addOn", name: "粟米丸", price: 8 },
            { category: "addOn", name: "鳴門片", price: 8 },
            { category: "addOn", name: "淮山卷", price: 8 },
            { category: "addOn", name: "時令蔬菜", price: 8 },
            { category: "addOn", name: "什莱魚丸", price: 8 },
            { category: "addOn", name: "海帶結", price: 8 },
            { category: "addOn", name: "慢煮1小時溫泉蛋", price: 8 },
            { category: "addOn", name: "有機低卡路里蒟蒻", price: 8 },

            { category: "addOn", name: "大根", price: 10 },
            { category: "addOn", name: "火炙鱈寶", price: 10 },
            { category: "addOn", name: "國產油豆腐", price: 10 },
            { category: "addOn", name: "台灣蛋餃", price: 10 },
            { category: "addOn", name: "台灣甜不辣", price: 10 },
            { category: "addOn", name: "腐皮年糕袋", price: 10 },

            { category: "addOn", name: "日式溏心蛋", price: 12 },
            { category: "addOn", name: "芝士竹輪", price: 12 },
            { category: "addOn", name: "魷魚餅", price: 12 },
            { category: "addOn", name: "白肉炸魚餅", price: 12 },
            { category: "addOn", name: "手工和牛餃子", price: 12 },
            { category: "addOn", name: "墨汁花枝球", price: 12 },

            { category: "addOn", name: "豆腐魚球", price: 16 },
            { category: "addOn", name: "和風牛肉", price: 16 },
            { category: "addOn", name: "日式醬燒叉燒", price: 16 },
            { category: "addOn", name: "明太子魚堡", price: 16 },
            { category: "addOn", name: "照燒雞肉", price: 16 },
            { category: "addOn", name: "燒魚卷", price: 16 },
            { category: "addOn", name: "帶子餅", price: 16 },

            { category: "addOn", name: "韓式麻藥流心蛋（2隻）", price: 28 },
            { category: "addOn", name: "手工和牛餃子（6隻）（湯煮）", price: 30 },
            { category: "addOn", name: "手工和牛餃子（6隻）（生餃）", price: 30 },
            { category: "addOn", name: "手工和牛餃子（12隻）（湯煮）", price: 55 },
            { category: "addOn", name: "手工和牛餃子（12隻）（生餃）", price: 55 },
            { category: "addOn", name: "懶人自煮方便包", price: 45 },
            { category: "addOn", name: "利尻昆布鰹魚湯包（1200 ml）", price: 35 },

            { category: "set", name: "招牌關東煮", price: 38 },
            { category: "set", name: "招牌關東煮烏冬", price: 53 },
            { category: "set", name: "開胃日式冷麵（青瓜絲，蟹籽，蟹捧，魚片，北海道野葛麵）", price: 45 }
        ];

        const collectionRef = collection(db, "noodles");
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
