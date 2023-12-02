interface SectionProps {
    children: React.ReactNode;
    title?: string;
    center?: boolean;
    padding?: boolean;
    noGap?: boolean;
    backgroundColor?: string;
}

export default function Section({ children, title, center, padding, noGap, backgroundColor }: SectionProps) {
    return (
        <section className={`flex flex-col flex-1 ${center && "items-center"} ${padding && "p-4"} ${!noGap && "gap-4"} ${backgroundColor}`}>
            {title && <h1 className="text-lg text-center border-b border-yellow-600">{title}</h1>}
            {children}
        </section>
    );
}
