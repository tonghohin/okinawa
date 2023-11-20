import PublicNavBar from "@/components/public/PublicNavBar";
import Provider from "@/contexts/Provider";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Provider>
            <main className="flex flex-col">
                <PublicNavBar />
                {children}
            </main>
        </Provider>
    );
}
