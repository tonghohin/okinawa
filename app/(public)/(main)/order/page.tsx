import Tab from "@/components/Tab";
import RiceOrderForm from "@/components/public/order/RiceOrderForm";
import SnacksOrderForm from "@/components/public/order/SnacksOrderForm";
import Total from "@/components/public/order/Total";
import FirestoreService from "@/firestore/FirestoreService";
import { MenuCategories } from "@/types/Menu";

export default async function Order() {
    const riceMenu = await FirestoreService.getInstance().getRiceMenu();
    const snacksMenu = await FirestoreService.getInstance().getSnacksMenu();
    const noodlesMenu = await FirestoreService.getInstance().getNoodlesMenu();

    return (
        <section className="flex flex-col items-center gap-4">
            <Total />
            <Tab
                tabs={[
                    {
                        label: MenuCategories.rice,
                        component: <RiceOrderForm riceMenu={riceMenu} />
                    },
                    // {
                    //     label: MenuCategories.noodles,
                    //     component: <NoodlesMenu noodlesMenu={noodlesMenu} />
                    // },
                    {
                        label: MenuCategories.snacks,
                        component: <SnacksOrderForm snacksMenu={snacksMenu} />
                    }
                ]}
            />
        </section>
    );
}
