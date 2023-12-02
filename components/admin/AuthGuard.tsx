"use client";

import useAuthStore from "@/stores/authStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Loading from "../Loading";

interface AuthGuardProps {
    isAccessible: boolean;
    children: React.ReactNode;
}

export default function AuthGuard({ isAccessible, children }: AuthGuardProps) {
    const router = useRouter();

    const checkAuthState = useAuthStore((state) => state.checkAuthState);
    const user = useAuthStore((state) => state.user);
    const isPending = useAuthStore((state) => state.isPending);

    useEffect(() => {
        checkAuthState();
    }, []);

    useEffect(() => {
        if (!isPending) {
            if (isAccessible && !user) {
                router.replace("/admin/login");
            }
            if (!isAccessible && user) {
                router.replace("/admin");
            }
        }
    }, [user, isPending]);

    if (isPending) {
        return <Loading />;
    }
    if ((isAccessible && user) || (!isAccessible && !user)) {
        return <>{children}</>;
    }
    return <Loading />;
}
