"use client";

import FirebaseService from "@/services/FirebaseService";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ChipButton from "../ChipButton";
import Section from "../Section";

export default function AdminNavBar() {
    const pathname = usePathname();

    return (
        <nav>
            <Section backgroundColor="bg-yellow-600" center padding>
                <Link href="/admin" className="text-2xl">
                    虛擬餐廳 Admin
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/admin/orders/old" className={`${pathname === "/admin/orders/old" && "border-b-2 border-neutral-800"} hover:border-b-2 hover:border-neutral-800`}>
                        舊Order
                    </Link>
                    <Link href="/admin/orders" className={`${pathname === "/admin/orders" && "border-b-2 border-neutral-800"} hover:border-b-2 hover:border-neutral-800`}>
                        新Order
                    </Link>
                    <ChipButton className="bg-yellow-700" onClick={FirebaseService.logOut}>
                        登出
                    </ChipButton>
                </div>
            </Section>
        </nav>
    );
}
