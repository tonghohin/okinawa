import AdminNavBar from "@/components/admin/AdminNavBar";
import AuthGuard from "@/components/admin/AuthGuard";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard isAccessible={true}>
            <main className="flex flex-col">
                <AdminNavBar />
                <main className="bg-neutral-300 rounded">{children}</main>
            </main>
        </AuthGuard>
    );
}
