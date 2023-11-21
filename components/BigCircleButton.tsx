interface BigCircleButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

export default function BigCircleButton({ children, className, onClick, disabled }: BigCircleButtonProps) {
    return (
        <button type="button" className={`rounded-full p-6 transition-all ${disabled && "opacity-60"} ${className}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}
