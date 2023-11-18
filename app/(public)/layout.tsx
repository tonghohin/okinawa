export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-yellow-500">
            <main className="m-auto flex flex-col justify-center">{children}</main>
        </main>
    );
}
