import Tab from "@/components/Tab";
import SnacksMenu from "@/components/public/menu/SnacksMenu";
import NoodlesMenu from "@/components/public/menu/NoodlesMenu";
import RiceMenu from "@/components/public/menu/RiceMenu";
import FirestoreService from "@/firestore/FirestoreService";
import { Menu } from "@/schemas/Menu";

export default async function MainMenu() {
    const riceMenu = await FirestoreService.getInstance().getRiceMenu();
    const snacksMenu = await FirestoreService.getInstance().getSnacksMenu();
    const noodlesMenu = await FirestoreService.getInstance().getNoodlesMenu();

    return (
        <Tab
            tabs={[
                {
                    label: Menu.Categories.Mapping.rice,
                    component: <RiceMenu riceMenu={riceMenu} />
                },
                {
                    label: Menu.Categories.Mapping.noodles,
                    component: <NoodlesMenu noodlesMenu={noodlesMenu} />
                },
                {
                    label: Menu.Categories.Mapping.snacks,
                    component: <SnacksMenu snacksMenu={snacksMenu} />
                }
            ]}
        />
    );
}
