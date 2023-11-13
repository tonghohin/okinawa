"use client";

import { useState } from "react";

interface TabProps {
    tabs: { label: string; component?: React.ReactNode }[];
}

export default function Tab({ tabs }: TabProps) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section className="w-full">
            <nav>
                {tabs.map((tab, index) => (
                    <button key={index} onClick={() => setActiveTab(index)} className={`${index === 0 && "rounded-ss"} ${index === tabs.length - 1 && "rounded-se"} ${index !== tabs.length - 1 && "border-r"} p-2 bg-zinc-600 text-zinc-50 w-32 hover:bg-zinc-500 transition-all`}>
                        {tab.label}
                    </button>
                ))}
            </nav>
            <article className="rounded-es rounded-e border  p-4">{tabs[activeTab].component}</article>
        </section>
    );
}
