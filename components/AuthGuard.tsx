"use client";

import { useAuth } from "@/contexts/AuthContextProvider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Loading from "./Loading";

interface AuthGuardProps {
    isAccessible: boolean;
    children: React.ReactNode;
}

export default function AuthGuard({ isAccessible, children }: AuthGuardProps) {
    const router = useRouter();
    const { user, isPending } = useAuth();

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
