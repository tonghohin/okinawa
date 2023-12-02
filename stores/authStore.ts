import FirebaseService from "@/services/FirebaseService";
import { User } from "firebase/auth";
import { create } from "zustand";

interface AuthState {
    user: User | null;
    isPending: boolean;
    checkAuthState: () => void;
}

const useAuthStore = create<AuthState>()((set) => ({
    user: FirebaseService.currentUser,
    isPending: true,
    checkAuthState: () => FirebaseService.checkAuthState((user) => set(() => ({ user: user, isPending: false })))
}));

export default useAuthStore;
