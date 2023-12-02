"use client";

import Section from "@/components/Section";
import Skeleton from "@/components/Skeleton";
import { Order } from "@/schemas/Order";
import FirebaseService from "@/services/FirebaseService";
import { Tools } from "@/tools/Tools";
import { Timestamp, collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";

interface OrdersProps {
    isOld: boolean;
}

export default function Orders({ isOld }: OrdersProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState(Order.Frontend.Form.Schema.array().parse([]));

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(FirebaseService.db, "orders"), where("delivered", "==", isOld), orderBy("date", "desc")), async (snapshot) => {
            const ordersData = snapshot.docs.map((order) => ({
                id: order.id,
                ...order.data(),
                date: (order.data().date as Timestamp).toDate()
            }));
            const validatedOrders = Order.Schema.array().parse(ordersData);
            const ordersWithJoinedItems = await Tools.Frontend.transformOrderFromBackend(validatedOrders);
            setOrders(ordersWithJoinedItems);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Section padding>
            {isLoading ? (
                <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </>
            ) : orders.length === 0 ? (
                <section className={`flex flex-col gap-4 bg-yellow-500 rounded p-4`}>
                    <p>{isOld ? "冇舊Order" : "冇新Order"}</p>
                </section>
            ) : (
                orders.map((order) => <OrderCard key={order.id} order={order} setOrders={setOrders} completed={isOld} />)
            )}
        </Section>
    );
}
