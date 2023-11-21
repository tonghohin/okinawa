interface ChipButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

export default function ChipButton({ children, className, onClick, disabled }: ChipButtonProps) {
    return (
        <button type="button" className={`flex items-center gap-4 rounded-full px-6 py-2 text-neutral-50 transition-all hover:shadow-md ${className} ${disabled && "opacity-60"}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}
