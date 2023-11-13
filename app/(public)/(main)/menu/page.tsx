import FirestoreQuery from "@/app/firestore/FirestoreQuery";
import Tab from "@/components/Tab";
import RiceMenu from "@/components/public/RiceMenu";

export default async function Menu() {
    const riceMenu = await FirestoreQuery.getInstance().getRiceMenu();

    return (
        <main className="flex gap-2 justify-around flex-wrap">
            <Tab
                tabs={[
                    {
                        label: "Rice",
                        component: <RiceMenu riceMenu={riceMenu} />
                    },
                    {
                        label: "Snacks",
                        component: <div>test</div>
                    }
                ]}
            />
        </main>
    );
}
