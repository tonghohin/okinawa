import Provider from "@/contexts/admin/Provider";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Provider>
            <main className="flex flex-col justify-center bg-neutral-800">{children}</main>
        </Provider>
    );
}
