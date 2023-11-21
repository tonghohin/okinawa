import Tab from "@/components/Tab";
import NoodlesOrderForm from "@/components/public/order/NoodlesOrderForm";
import RiceOrderForm from "@/components/public/order/RiceOrderForm";
import SnacksOrderForm from "@/components/public/order/SnacksOrderForm";
import Total from "@/components/public/order/Total";
import FirestoreService from "@/firestore/FirestoreService";
import { Menu } from "@/schemas/Menu";

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
                        label: Menu.Categories.Mapping.rice,
                        component: <RiceOrderForm riceMenu={riceMenu} />
                    },
                    {
                        label: Menu.Categories.Mapping.noodles,
                        component: <NoodlesOrderForm noodlesMenu={noodlesMenu} />
                    },
                    {
                        label: Menu.Categories.Mapping.snacks,
                        component: <SnacksOrderForm snacksMenu={snacksMenu} />
                    }
                ]}
            />
        </section>
    );
}
