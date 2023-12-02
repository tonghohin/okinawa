"use client";

import { IconCaretDown } from "@tabler/icons-react";
import { useState } from "react";

interface AccordionProps {
    title: string;
    children: React.ReactNode;
    onOpen?: () => void;
}

export default function Accordion({ title, children, onOpen }: AccordionProps) {
    const [isContentVisible, setIsContentVisible] = useState(false);

    function handleAccordionClick() {
        setIsContentVisible((prevIsContentVisible) => !prevIsContentVisible);
        onOpen?.();
    }

    return (
        <section className="bg-yellow-600 rounded flex flex-col gap-4 p-4 cursor-pointer transition-all hover:shadow-md" onClick={handleAccordionClick}>
            <p className="flex items-center justify-between border-b border-yellow-700">
                <span>{title}</span>
                <IconCaretDown size={24} />
            </p>
            {isContentVisible && children}
        </section>
    );
}
