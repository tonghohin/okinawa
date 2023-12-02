import { General } from "@/schemas/General";
import { initializeApp } from "firebase/app";
import { User, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export default class FirebaseService {
    private static readonly _firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    };
    private static _app = initializeApp(this._firebaseConfig);
    private static _auth = getAuth(this._app);

    public static currentUser = this._auth.currentUser;
    public static db = getFirestore(this._app);

    public static async checkAuthState(action: (user: User | null) => void) {
        onAuthStateChanged(this._auth, (user) => {
            console.log("User state changed.");
            action(user);
        });
    }

    public static async logIn(credential: General.Credentials.Type) {
        signInWithEmailAndPassword(this._auth, credential.email, credential.password);
    }

    public static async logOut() {
        signOut(this._auth);
    }

    public static async resetPassword(email: string) {
        sendPasswordResetEmail(this._auth, email);
    }
}
