interface SectionProps {
    children: React.ReactNode;
    title?: string;
}

export default function Section({ children, title }: SectionProps) {
    return (
        <section className="flex flex-col gap-4">
            {title && <h1 className="text-lg text-center border-b border-yellow-600">{title}</h1>}
            {children}
        </section>
    );
}
