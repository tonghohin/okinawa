import AuthContextProvider from "@/contexts/AuthContextProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthContextProvider>
            <main className="bg-zinc-800">
                <main className="max-w-7xl m-auto flex justify-center items-center px-4">{children}</main>
            </main>
        </AuthContextProvider>
    );
}
