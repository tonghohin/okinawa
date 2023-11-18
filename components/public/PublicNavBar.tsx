"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PublicNavBar() {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col items-center gap-4 p-4">
            <Link href="/" className="text-2xl">
                沖繩味之賞
            </Link>
            <div className="flex items-center gap-6">
                <Link href="/menu" className={`${pathname === "/menu" && "border-b-2 border-neutral-800"} hover:border-b-2 hover:border-neutral-800`}>
                    睇Menu
                </Link>
                <Link href="/order" className={`${pathname === "/order" && "border-b-2 border-neutral-800"} hover:border-b-2 hover:border-neutral-800`}>
                    落Order
                </Link>
                <Link href="/contact" className={`${pathname === "/contact" && "border-b-2 border-neutral-800"} hover:border-b-2 hover:border-neutral-800`}>
                    搵我地
                </Link>
            </div>
        </nav>
    );
}
