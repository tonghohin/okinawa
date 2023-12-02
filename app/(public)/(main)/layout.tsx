import Section from "@/components/Section";
import PublicNavBar from "@/components/public/PublicNavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Section noGap>
            <PublicNavBar />
            {children}
        </Section>
    );
}
