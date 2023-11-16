import { IconBrandWhatsapp, IconClock, IconHome, IconPhone } from "@tabler/icons-react";

export default function Contact() {
    return (
        <section className="bg-yellow-400 rounded p-4 flex flex-col gap-4 items-center">
            <div className="flex items-center gap-2">
                <div>
                    <IconHome size={24} />
                </div>
                <span>葵涌 梨木道32-50號 金運工業大廈 第二座 Foodie City</span>
            </div>
            <div className="flex items-center gap-2">
                <div>
                    <IconPhone size={24} />
                </div>
                <span>+852 9558 2500</span>
            </div>
            <div className="flex items-center gap-2">
                <div>
                    <IconBrandWhatsapp size={24} />
                </div>
                <span>+852 6343 9624</span>
            </div>
            <div className="flex items-center gap-2">
                <div>
                    <IconClock size={24} />
                </div>
                <span>11:00 a.m. - 9:00 p.m.</span>
            </div>
        </section>
    );
}
