import AuthContextProvider from "@/contexts/AuthContextProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthContextProvider>
            <main className="bg-neutral-800">
                <main className="m-auto flex justify-center items-center px-4">{children}</main>
            </main>
        </AuthContextProvider>
    );
}
