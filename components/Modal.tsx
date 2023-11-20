import { IconX } from "@tabler/icons-react";
import CircleButton from "./CircleButton";

interface ModalProps {
    children: React.ReactNode;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({ children, setIsModalOpen }: ModalProps) {
    return (
        <section className="fixed left-0 top-0 w-full h-full p-4 bg-neutral-800 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center">
            <article className="flex flex-col items-center gap-4 p-4 rounded bg-yellow-300 overflow-auto">
                <CircleButton className="bg-neutral-400 bg-opacity-30 cursor-pointer self-end hover:bg-opacity-100 transition-all" onClick={() => setIsModalOpen(false)}>
                    <IconX size={18} />
                </CircleButton>
                {children}
            </article>
        </section>
    );
}
