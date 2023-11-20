import Section from "@/components/Section";
import { RiceItem } from "@/types/Menu";
import RiceMenuSection from "./RiceMenuSection";

interface RiceMenuProps {
    riceMenu: RiceItem[];
}

export default function RiceMenu({ riceMenu }: RiceMenuProps) {
    return (
        <Section>
            <p>以下丼飯包括鮮牛蒡野菜炊飯 ＋ 是日漬物 ＋ 招牌昆布鰹魚湯</p>
            <p>免費轉稻庭烏冬（大盛）</p>
            <p>套餐配日式炒野菜 或 清新胡麻沙律＋$15</p>
            <p>午市丼飯追加小食 每款小食即減 $5</p>
            <RiceMenuSection menu={riceMenu} category="beef" />
            <RiceMenuSection menu={riceMenu} category="pork" />
            <RiceMenuSection menu={riceMenu} category="eel" />
            <RiceMenuSection menu={riceMenu} category="combo" />
            <RiceMenuSection menu={riceMenu} category="curry" />
        </Section>
    );
}
