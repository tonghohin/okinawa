"use client";

import { auth } from "@/firebase/configuration";
import { User, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContext {
    user: User | null;
    isPending: boolean;
}

const AuthContext = createContext<AuthContext>({ user: auth.currentUser, isPending: true });

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [authContext, setAuthContext] = useState<AuthContext>({ user: auth.currentUser, isPending: true });

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setAuthContext({ user: user, isPending: false });
        });
    }, []);

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
export function logIn(credential: { email: string; password: string }) {
    return signInWithEmailAndPassword(auth, credential.email, credential.password);
}
export function logOut() {
    return signOut(auth);
}
export function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
}
