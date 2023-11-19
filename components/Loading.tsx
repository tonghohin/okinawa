import { IconLoader2 } from "@tabler/icons-react";

export default function Loading() {
    return (
        <div className="w-full h-full flex justify-center">
            <IconLoader2 className="animate-spin text-neutral-50" size={48} />
        </div>
    );
}
