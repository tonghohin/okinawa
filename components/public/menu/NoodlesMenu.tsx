import Section from "@/components/Section";
import { NoodlesItem } from "@/types/Menu";
import NoodlesMenuSection from "./NoodlesMenuSection";

interface NoodlesMenuProps {
    noodlesMenu: NoodlesItem[];
}

export default function NoodlesMenu({ noodlesMenu }: NoodlesMenuProps) {
    return (
        <Section>
            <NoodlesMenuSection menu={noodlesMenu} category="main" />
            <NoodlesMenuSection menu={noodlesMenu} category="addOn" />
        </Section>
    );
}
