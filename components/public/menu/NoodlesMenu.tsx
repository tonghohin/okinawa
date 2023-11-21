import Section from "@/components/Section";
import NoodlesMenuSection from "./NoodlesMenuSection";
import { Menu } from "@/schemas/Menu";

interface NoodlesMenuProps {
    noodlesMenu: Menu.Noodles.Item.Type[];
}

export default function NoodlesMenu({ noodlesMenu }: NoodlesMenuProps) {
    return (
        <Section>
            <NoodlesMenuSection menu={noodlesMenu} category="main" />
            <NoodlesMenuSection menu={noodlesMenu} category="addOn" />
        </Section>
    );
}
