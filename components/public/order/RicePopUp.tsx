import { RiceItem } from "@/types/Menu";

interface RicePopUpProps {
    selectedRice: RiceItem;
}

export default function RicePopUp({ selectedRice }: RicePopUpProps) {
    return <div>{selectedRice.name}</div>;
}
