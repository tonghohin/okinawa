import Link from "next/link";

export default function Home() {
    return (
        <section className="flex flex-col gap-4 items-center justify-center">
            <h1>No Logo</h1>
            <nav className="flex gap-4">
                <Link href="/menu" className="bg-yellow-400 p-2 rounded hover:bg-yellow-600 hover:text-slate-50 transition-all">
                    睇Menu
                </Link>
                <Link href="/order" className="bg-yellow-400 p-2 rounded hover:bg-yellow-600 hover:text-slate-50 transition-all">
                    落Order
                </Link>
                <Link href="/contact" className="bg-yellow-400 p-2 rounded hover:bg-yellow-600 hover:text-slate-50 transition-all">
                    搵我地
                </Link>
            </nav>
        </section>
    );
}
