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
            <article className="fixed bottom-10 left-1/2 -translate-x-1/2 flex gap-4 bg-sky-700 text-zinc-50 rounded-full px-6 py-2 cursor-pointer transition-all hover:bg-sky-800 hover:shadow-md">
                <IconShoppingCart />
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
