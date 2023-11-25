export default function SquareButton({ children }: { children: React.ReactNode }) {
    return (
        <button type="submit" className="bg-yellow-500 p-4 rounded hover:bg-yellow-600 transition-all">
            {children}
        </button>
    );
}
