import Section from "@/components/Section";
import contactUs from "@/public/contactUs.svg";
import { IconBrandWhatsapp, IconClock, IconHome, IconPhone } from "@tabler/icons-react";
import Image from "next/image";

export default function Contact() {
    return (
        <Section backgroundColor="bg-yellow-400" center padding>
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
            <Image src={contactUs} width={300} height={200} alt="Contact Us" priority />
            <div className="self-stretch flex-1 relative bg-yellow-500 rounded">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14758.37925858653!2d114.136225!3d22.3689232!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403f9d962052829%3A0x8a2a513f257bfa21!2z5rKW57mp5ZGz5LmL6LOe!5e0!3m2!1sen!2sca!4v1700658389316!5m2!1sen!2sca" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
        </Section>
    );
}
