import { RiceItem } from "@/types/Menu";
import RiceOrderFormSection from "./RiceOrderFormSection";
import Section from "@/components/Section";

interface RiceOrderFormProps {
    riceMenu: RiceItem[];
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
