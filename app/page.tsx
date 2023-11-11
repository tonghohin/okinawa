import Link from "next/link";

export default function Home() {
    return (
        <main className="flex flex-col gap-2 items-center justify-center">
            <h1>No Logo</h1>
            <nav className="flex gap-2">
                <Link href="/menu">睇Menu</Link>
                <Link href="/order">落Order</Link>
            </nav>
        </main>
    );
}
