import Section from "@/components/Section";
import PublicNavBar from "@/components/public/PublicNavBar";
import Provider from "@/contexts/public/Provider";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Provider>
            <Section noGap>
                <PublicNavBar />
                {children}
            </Section>
        </Provider>
    );
}
