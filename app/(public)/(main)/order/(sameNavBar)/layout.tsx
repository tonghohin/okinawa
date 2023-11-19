import Total from "@/components/public/order/Total";
import { IconArrowNarrowLeft, IconCurrencyDollar } from "@tabler/icons-react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex flex-col gap-4">
            <div className="flex justify-between px-4">
                <Link href="/order" className="flex items-center gap-4 bg-yellow-600 rounded-full px-6 py-2 cursor-pointer transition-all hover:bg-yellow-400 hover:shadow-md">
                    <IconArrowNarrowLeft size={24} />
                </Link>
                <Total />
                <Link href="/order/details" className="flex items-center gap-4 bg-green-700 text-neutral-50 rounded-full px-6 py-2 cursor-pointer transition-all hover:bg-green-800 hover:shadow-md">
                    <IconCurrencyDollar size={24} />
                </Link>
            </div>

            {children}
        </section>
    );
}
