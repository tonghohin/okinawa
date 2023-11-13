import { RiceItem } from "@/types/Menu";
import RiceMenuSection from "./RiceMenuSection";

interface RiceMenuProps {
    riceMenu: RiceItem[];
}

export default function RiceMenu({ riceMenu }: RiceMenuProps) {
    return (
        <section className="flex flex-col gap-4">
            <RiceMenuSection menu={riceMenu} category="beef" />
            <RiceMenuSection menu={riceMenu} category="pork" />
            <RiceMenuSection menu={riceMenu} category="eel" />
            <RiceMenuSection menu={riceMenu} category="combo" />
            <RiceMenuSection menu={riceMenu} category="curry" />
        </section>
    );
}
