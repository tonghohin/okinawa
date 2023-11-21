import Section from "@/components/Section";
import RiceOrderFormSection from "./RiceOrderFormSection";
import { Menu } from "@/schemas/Menu";

interface RiceOrderFormProps {
    riceMenu: Menu.Rice.Item.Type[];
}

export default function RiceOrderForm({ riceMenu }: RiceOrderFormProps) {
    return (
        <Section>
            <RiceOrderFormSection menu={riceMenu} category="beef" />
            <RiceOrderFormSection menu={riceMenu} category="pork" />
            <RiceOrderFormSection menu={riceMenu} category="eel" />
            <RiceOrderFormSection menu={riceMenu} category="combo" />
            <RiceOrderFormSection menu={riceMenu} category="curry" />
        </Section>
    );
}
