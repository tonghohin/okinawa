"use client";

import { logOut } from "@/contexts/AuthContextProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNavBar() {
    const pathname = usePathname();

    return (
        <nav className="bg-yellow-500 rounded flex items-center gap-6 p-4">
            <h1 className="text-2xl">沖繩味之賞 Admin</h1>
            <div className="flex-1 flex items-center gap-4">
                <Link href="/admin" className={`${pathname === "/admin" && "border-b-2 border-zinc-800"} hover:border-b-2 hover:border-zinc-800`}>
                    Home
                </Link>
                <Link href="/admin/menu" className={`${pathname === "/admin/menu" && "border-b-2 border-zinc-800"} hover:border-b-2 hover:border-zinc-800`}>
                    整Menu
                </Link>
                <Link href="/admin/orders" className={`${pathname === "/admin/orders" && "border-b-2 border-zinc-800"} hover:border-b-2 hover:border-zinc-800`}>
                    睇Order
                </Link>
            </div>
            <button className="bg-yellow-400 p-2 rounded hover:bg-yellow-600 hover:text-zinc-50 transition-all" onClick={logOut}>
                登出
            </button>
        </nav>
    );
}
