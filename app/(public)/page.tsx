import ChipLink from "@/components/ChipLink";

export default function Home() {
    return (
        <section className="flex flex-col gap-4 items-center justify-center">
            <h1>No Logo</h1>
            <nav className="flex gap-4">
                <ChipLink href="/menu" className="bg-yellow-400">
                    睇Menu
                </ChipLink>
                <ChipLink href="/order" className="bg-yellow-400">
                    落Order
                </ChipLink>
                <ChipLink href="/contact" className="bg-yellow-400">
                    搵我地
                </ChipLink>
            </nav>
        </section>
    );
}
