import { IconBrandWhatsapp, IconClock, IconHome, IconPhone } from "@tabler/icons-react";

export default function Contact() {
    return (
        <section className="bg-yellow-400 p-4 flex flex-col gap-4 items-center flex-1">
            <p className="flex items-center gap-2">
                <span>
                    <IconHome size={24} />
                </span>
                <span>葵涌 梨木道32-50號 金運工業大廈 第二座 Foodie City</span>
            </p>
            <p className="flex items-center gap-2">
                <span>
                    <IconPhone size={24} />
                </span>
                <span>+852 9558 2500</span>
            </p>
            <p className="flex items-center gap-2">
                <span>
                    <IconBrandWhatsapp size={24} />
                </span>
                <span>+852 6343 9624</span>
            </p>
            <p className="flex items-center gap-2">
                <span>
                    <IconClock size={24} />
                </span>
                <span>11:00 a.m. - 9:00 p.m.</span>
            </p>
        </section>
    );
}
