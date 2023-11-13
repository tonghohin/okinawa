import Tab from "@/components/Tab";
import RiceMenu from "@/components/public/RiceMenu";
import SnacksMenu from "@/components/public/SnacksMenu";
import FirestoreService from "@/firestore/FirestoreService";
import { MenuCategories } from "@/types/Menu";

export default async function Menu() {
    const riceMenu = await FirestoreService.getInstance().getRiceMenu();
    const snacksMenu = await FirestoreService.getInstance().getSnacksMenu();

    return (
        <Tab
            tabs={[
                {
                    label: MenuCategories.rice,
                    component: <RiceMenu riceMenu={riceMenu} />
                },
                {
                    label: MenuCategories.snacks,
                    component: <SnacksMenu snacksMenu={snacksMenu} />
                }
            ]}
        />
    );
}
