import Tab from "@/components/Tab";
import SnacksMenu from "@/components/public/menu/SnacksMenu";
import NoodlesMenu from "@/components/public/menu/NoodlesMenu";
import RiceMenu from "@/components/public/menu/RiceMenu";
import FirestoreService from "@/firestore/FirestoreService";
import { MenuCategories } from "@/types/Menu";

export default async function Menu() {
    const riceMenu = await FirestoreService.getInstance().getRiceMenu();
    const snacksMenu = await FirestoreService.getInstance().getSnacksMenu();
    const noodlesMenu = await FirestoreService.getInstance().getNoodlesMenu();

    return (
        <Tab
            tabs={[
                {
                    label: MenuCategories.rice,
                    component: <RiceMenu riceMenu={riceMenu} />
                },
                {
                    label: MenuCategories.noodles,
                    component: <NoodlesMenu noodlesMenu={noodlesMenu} />
                },
                {
                    label: MenuCategories.snacks,
                    component: <SnacksMenu snacksMenu={snacksMenu} />
                }
            ]}
        />
    );
}
