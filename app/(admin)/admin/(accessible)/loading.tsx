import Section from "@/components/Section";

export default function Loading() {
    return (
        <Section padding>
            <div className="flex flex-col gap-4 shadow rounded bg-yellow-500 p-4">
                <div className="flex flex-1 gap-4">
                    <div className="h-7 bg-yellow-600 rounded flex-[60%] animate-pulse" />
                    <div className="h-7 bg-yellow-600 rounded flex-auto animate-pulse" />
                </div>
                <div className="flex flex-1 gap-4">
                    <div className="h-7 bg-yellow-600 rounded flex-[50%] animate-pulse" />
                    <div className="h-7 bg-yellow-600 rounded flex-1 animate-pulse" />
                </div>
                <div className="h-7 bg-yellow-600 rounded animate-pulse" />
            </div>
            <div className="flex flex-col gap-4 shadow rounded bg-yellow-500 p-4">
                <div className="flex flex-1 gap-4">
                    <div className="h-7 bg-yellow-600 rounded flex-[60%] animate-pulse" />
                    <div className="h-7 bg-yellow-600 rounded flex-auto animate-pulse" />
                </div>
                <div className="flex flex-1 gap-4">
                    <div className="h-7 bg-yellow-600 rounded flex-[50%] animate-pulse" />
                    <div className="h-7 bg-yellow-600 rounded flex-1 animate-pulse" />
                </div>
                <div className="h-7 bg-yellow-600 rounded animate-pulse" />
            </div>
            <div className="flex flex-col gap-4 shadow rounded bg-yellow-500 p-4">
                <div className="flex flex-1 gap-4">
                    <div className="h-7 bg-yellow-600 rounded flex-[60%] animate-pulse" />
                    <div className="h-7 bg-yellow-600 rounded flex-auto animate-pulse" />
                </div>
                <div className="flex flex-1 gap-4">
                    <div className="h-7 bg-yellow-600 rounded flex-[50%] animate-pulse" />
                    <div className="h-7 bg-yellow-600 rounded flex-1 animate-pulse" />
                </div>
                <div className="h-7 bg-yellow-600 rounded animate-pulse" />
            </div>
        </Section>
    );
}
