interface CircleButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function CircleButton({ children, className, onClick }: CircleButtonProps) {
    return (
        <button type="button" className={`rounded-full p-1 ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}
