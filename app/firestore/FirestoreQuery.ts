import { db } from "@/firebase/configuration";
import { collection, getDocs } from "firebase/firestore";
import { RiceMenu, RiceMenuKeys } from "../interfaces/Menu";

export default class FirestoreQuery {
    private static instance: FirestoreQuery;
    private readonly _riceCategories: RiceMenuKeys[] = ["beef", "pork", "eel", "chicken", "combo", "curry"];
    private _pathToMenuDocument: string = "";
    private _pathToRiceDocument: string = "";

    private constructor() {}

    public static getInstance(): FirestoreQuery {
        if (!FirestoreQuery.instance) {
            FirestoreQuery.instance = new FirestoreQuery();
        }

        return FirestoreQuery.instance;
    }

    public async getPathToMenuDocument() {
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

    public async getPathToRiceDocument() {
        if (this._pathToMenuDocument === "") {
            const pathToMenuDocument = await this.getPathToMenuDocument();
            const querySnapshot = await getDocs(collection(db, pathToMenuDocument, "rice"));
            const [riceDocument] = querySnapshot.docs;
            const riceId = riceDocument.id;
            this._pathToRiceDocument = `${pathToMenuDocument}/rice/${riceId}`;
            return this._pathToRiceDocument;
        } else {
            return this._pathToMenuDocument;
        }
    }

    public async getRiceMenu() {
        const pathToRiceDocument = await this.getPathToRiceDocument();
        const menu = {} as RiceMenu;
        for (const category of this._riceCategories) {
            const categoryRiceData = await getDocs(collection(db, pathToRiceDocument, category));
            const categoryRice = categoryRiceData.docs.map((doc) => {
                return {
                    id: doc.id,
                    name: doc.data().name,
                    price: doc.data().price
                };
            });
            menu[category] = categoryRice;
        }
        return menu;
    }
}
