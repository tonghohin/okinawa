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
        <section className="flex flex-col items-center gap-4">
            <article className="flex items-center gap-4 bg-sky-700 text-slate-50 rounded-full px-4 py-2 cursor-pointer transition-all hover:bg-sky-800 hover:shadow-md">
                <IconShoppingCart size={24} />
                <span>View Cart</span>
                <span>Total: $0</span>
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
