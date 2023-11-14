import { NoodleItem } from "@/types/Menu";
import NoodlesMenuSection from "./NoodlesMenuSection";

interface NoodlesMenuProps {
    noodlesMenu: NoodleItem[];
}

export default function NoodlesMenu({ noodlesMenu }: NoodlesMenuProps) {
    return (
        <section className="flex flex-col gap-4">
            <NoodlesMenuSection menu={noodlesMenu} category="set" />
            <NoodlesMenuSection menu={noodlesMenu} category="main" />
            <NoodlesMenuSection menu={noodlesMenu} category="addOn" />
        </section>
    );
}
