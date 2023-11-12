import FirestoreQuery from "@/app/firestore/FirestoreQuery";

export default async function Menu() {
    const riceMenu = await FirestoreQuery.getInstance().getRiceMenu();
    console.log("Menu --- riceMenu", riceMenu);

    return (
        <main className="flex flex-col gap-2 items-center">
            <h1>Menu</h1>
            <article>
                <h1>Beef</h1>
                {riceMenu.beef.map((rice) => (
                    <p>
                        {rice.name} - ${rice.price}
                    </p>
                ))}
            </article>
            <article>
                <h1>Pork</h1>
                {riceMenu.pork.map((rice) => (
                    <p>
                        {rice.name} - ${rice.price}
                    </p>
                ))}
            </article>
            <article>
                <h1>Eel</h1>
                {riceMenu.eel.map((rice) => (
                    <p>
                        {rice.name} - ${rice.price}
                    </p>
                ))}
            </article>
            <article>
                <h1>Chicken</h1>
                {riceMenu.chicken.map((rice) => (
                    <p>
                        {rice.name} - ${rice.price}
                    </p>
                ))}
            </article>
            <article>
                <h1>Combo</h1>
                {riceMenu.combo.map((rice) => (
                    <p>
                        {rice.name} - ${rice.price}
                    </p>
                ))}
            </article>
            <article>
                <h1>Curry</h1>
                {riceMenu.curry.map((rice) => (
                    <p>
                        {rice.name} - ${rice.price}
                    </p>
                ))}
            </article>
        </main>
    );
}
