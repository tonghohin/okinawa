interface ToggleButtonProps {
    children: React.ReactNode;
    on: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function ToggleButton({ children, on, onClick }: ToggleButtonProps) {
    return (
        <button type="button" className={`rounded-full px-6 py-2 border border-yellow-500 hover:bg-yellow-500 transition-all ${on && "bg-yellow-500"}`} onClick={onClick}>
            {children}
        </button>
    );
}
