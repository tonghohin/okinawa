"use client";

import Section from "@/components/Section";
import Skeleton from "@/components/Skeleton";
import { db } from "@/firebase/configuration";
import { Order } from "@/schemas/Order";
import { Tools } from "@/tools/Tools";
import { Timestamp, collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";

interface OrdersProps {
    isOld: boolean;
}

export default function Orders({ isOld }: OrdersProps) {
    const [newOrderId, setNewOrderId] = useState<string[]>([]);
    const [orders, setOrders] = useState(Order.Frontend.Form.Schema.array().parse([]));

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "orders"), where("delivered", "==", isOld), orderBy("date", "desc"), limit(5)), async (snapshot) => {
            const newOrders = [];
            const ordersData = [];

            for (const order of snapshot.docChanges()) {
                if (!isOld) {
                    if (order.type === "added") {
                        newOrders.push(order.doc.id);
                    }
                }

                ordersData.push({
                    id: order.doc.id,
                    ...order.doc.data(),
                    date: (order.doc.data().date as Timestamp).toDate()
                });
            }

            setNewOrderId(newOrders);

            const validatedOrders = Order.Schema.array().parse(ordersData);
            const ordersWithJoinedItems = await Tools.Frontend.transformOrderFromBackend(validatedOrders);
            setOrders((prevOrders) => [...ordersWithJoinedItems, ...prevOrders]);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Section padding>
            {orders.length === 0 ? (
                <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </>
            ) : (
                orders.map((order) => <OrderCard key={order.id} order={order} setOrders={setOrders} completed={isOld} newOrderId={newOrderId} />)
            )}
        </Section>
    );
}
