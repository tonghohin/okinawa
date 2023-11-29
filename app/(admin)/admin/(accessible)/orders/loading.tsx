import Section from "@/components/Section";
import Skeleton from "@/components/Skeleton";

export default function Loading() {
    return (
        <Section padding>
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </Section>
    );
}
