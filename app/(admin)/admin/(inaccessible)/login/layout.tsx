import AuthGuard from "@/components/admin/AuthGuard";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <AuthGuard isAccessible={false}>{children}</AuthGuard>;
}
