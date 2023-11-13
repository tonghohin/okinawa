import PublicNavBar from "@/components/public/PublicNavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex flex-col">
            <PublicNavBar />
            {children}
        </main>
    );
}
