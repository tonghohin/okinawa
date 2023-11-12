import AuthGuard from "@/components/AuthGuard";
import NavBar from "@/components/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard isAccessible={true}>
            <main className="flex flex-col">
                <NavBar />
                <main className="bg-zinc-300 rounded">{children}</main>
            </main>
        </AuthGuard>
    );
}
