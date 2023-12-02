import ChipLink from "@/components/ChipLink";
import Section from "@/components/Section";
import Total from "@/components/public/order/Total";
import { IconArrowNarrowLeft, IconCurrencyDollar } from "@tabler/icons-react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Section>
            <div className="flex justify-between px-4">
                <ChipLink href="/order" className="bg-yellow-600">
                    <IconArrowNarrowLeft size={24} />
                </ChipLink>
                <Total />
                <ChipLink href="/order/confirm" className="bg-green-700">
                    <IconCurrencyDollar size={24} />
                </ChipLink>
            </div>
            {children}
        </Section>
    );
}
