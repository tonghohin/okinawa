"use client";

import { useState } from "react";
import Section from "./Section";

interface TabProps {
    tabs: { label: string; component?: React.ReactNode }[];
}

export default function Tab({ tabs }: TabProps) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Section noGap>
            <nav className="flex">
                {tabs.map((tab, index) => (
                    <button type="button" key={index} onClick={() => setActiveTab(index)} className={`${index === 0 && "rounded-ss bg-yellow-400"} ${index === tabs.length - 1 && "rounded-se"} ${index !== tabs.length - 1 && "border-r"} ${index == activeTab ? "bg-yellow-400" : "bg-yellow-600"} p-2 w-full hover:bg-yellow-400 transition-all`}>
                        {tab.label}
                    </button>
                ))}
            </nav>
            <Section>
                <article className="flex-1 p-4 bg-yellow-400">{tabs[activeTab].component}</article>
            </Section>
        </Section>
    );
}
