"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PublicNavBar() {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col items-center gap-4 p-4">
            <h1 className="text-2xl">沖繩味之賞</h1>
            <div className="flex items-center  gap-6">
                <Link href="/menu" className={`${pathname === "/menu" && "border-b-2 border-zinc-800"} hover:border-b-2 hover:border-zinc-800`}>
                    睇Menu
                </Link>
                <Link href="/order" className={`${pathname === "/order" && "border-b-2 border-zinc-800"} hover:border-b-2 hover:border-zinc-800`}>
                    落Order
                </Link>
            </div>
        </nav>
    );
}
