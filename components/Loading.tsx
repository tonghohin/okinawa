import { IconLoader2 } from "@tabler/icons-react";

export default function Loading() {
    return (
        <div className="w-full h-full flex justify-center">
            <IconLoader2 className="animate-spin text-yellow-300" size={24} />
        </div>
    );
}
