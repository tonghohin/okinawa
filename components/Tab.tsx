"use client";

import { useState } from "react";

interface TabProps {
    tabs: { label: string; component?: React.ReactNode }[];
}

export default function Tab({ tabs }: TabProps) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section className="w-full">
            <nav className="flex">
                {tabs.map((tab, index) => (
                    <button key={index} onClick={() => setActiveTab(index)} className={`${index === 0 && "rounded-ss bg-yellow-400"} ${index === tabs.length - 1 && "rounded-se"} ${index !== tabs.length - 1 && "border-r"} ${index == activeTab ? "bg-yellow-400" : "bg-yellow-600"} p-2 w-32 hover:bg-yellow-400 transition-all`}>
                        {tab.label}
                    </button>
                ))}
            </nav>
            <article className="rounded-es rounded-e p-4 bg-yellow-400">{tabs[activeTab].component}</article>
        </section>
    );
}
