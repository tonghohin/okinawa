import Link from "next/link";

interface ChipLinkProps {
    children: React.ReactNode;
    href: string;
    className?: string;
}

export default function ChipLink({ children, href, className }: ChipLinkProps) {
    return (
        <Link href={href} className={`flex items-center gap-4 rounded-full px-6 py-2 cursor-pointer transition-all hover:shadow-md ${className}`}>
            {children}
        </Link>
    );
}
