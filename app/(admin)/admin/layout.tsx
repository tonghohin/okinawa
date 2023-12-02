export default function Layout({ children }: { children: React.ReactNode }) {
    return <main className="flex flex-col justify-center bg-neutral-800">{children}</main>;
}
