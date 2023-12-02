import Tab from "@/components/Tab";
import NoodlesMenu from "@/components/public/menu/NoodlesMenu";
import RiceMenu from "@/components/public/menu/RiceMenu";
import SnacksMenu from "@/components/public/menu/SnacksMenu";
import { Menu } from "@/schemas/Menu";
import FirestoreService from "@/services/FirestoreService";

export default async function MainMenu() {
    const riceMenu = await FirestoreService.getRiceMenu();
    const snacksMenu = await FirestoreService.getSnacksMenu();
    const noodlesMenu = await FirestoreService.getNoodlesMenu();

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
