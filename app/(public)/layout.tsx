export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-yellow-500">
            <main className="max-w-7xl m-auto flex justify-center">{children}</main>
        </main>
    );
}
