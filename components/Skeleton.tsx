export default function Skeleton() {
    return (
        <div className="flex flex-col gap-4 shadow rounded bg-yellow-500 p-4">
            <div className="flex flex-1 gap-4">
                <div className="h-7 bg-yellow-600 rounded flex-[30%] animate-pulse" />
                <div className="flex-[40%]" />
                <div className="h-7 bg-yellow-600 rounded flex-[30%] animate-pulse" />
            </div>
            <div className="flex flex-1 gap-4">
                <div className="h-7 bg-yellow-600 rounded flex-[40%] animate-pulse" />
                <div className="flex-[60%]" />
            </div>
            <div className="flex flex-1 gap-4">
                <div className="h-7 bg-yellow-600 rounded flex-[50%] animate-pulse" />
                <div className="flex-[50%]" />
            </div>
            <div className="flex flex-1 gap-4">
                <div className="h-14 bg-yellow-600 rounded flex-1 animate-pulse" />
            </div>
            <div className="flex flex-1 gap-4">
                <div className="h-7 bg-yellow-600 rounded-full flex-1 animate-pulse" />
            </div>
            <div className="flex flex-1 gap-4">
                <div className="h-7 bg-yellow-600 rounded-full flex-1 animate-pulse" />
            </div>
        </div>
    );
}
