import Section from "@/components/Section";
import AdminNavBar from "@/components/admin/AdminNavBar";
import AuthGuard from "@/components/admin/AuthGuard";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard isAccessible={true}>
            <Section noGap>
                <AdminNavBar />
                {children}
            </Section>
        </AuthGuard>
    );
}
