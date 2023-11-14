import Tab from "@/components/Tab";
import RiceOrderForm from "@/components/public/order/RiceOrderForm";
import FirestoreService from "@/firestore/FirestoreService";
import { MenuCategories } from "@/types/Menu";
import { IconShoppingCart } from "@tabler/icons-react";

export default async function Order() {
    const riceMenu = await FirestoreService.getInstance().getRiceMenu();
    const snacksMenu = await FirestoreService.getInstance().getSnacksMenu();
    const noodlesMenu = await FirestoreService.getInstance().getNoodlesMenu();

    return (
        <section className="flex flex-col gap-2">
            <article className="flex gap-2 bg-amber-300 rounded-full p-2">
                <IconShoppingCart />
                <span>View Cart</span>
                <span>Total</span>
            </article>
            <Tab
                tabs={[
                    {
                        label: MenuCategories.rice,
                        component: <RiceOrderForm riceMenu={riceMenu} />
                    }
                    // {
                    //     label: MenuCategories.noodles,
                    //     component: <NoodlesMenu noodlesMenu={noodlesMenu} />
                    // },
                    // {
                    //     label: MenuCategories.snacks,
                    //     component: <SnacksMenu snacksMenu={snacksMenu} />
                    // }
                ]}
            />
        </section>
    );
}
