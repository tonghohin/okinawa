"use client";

import Section from "@/components/Section";
import Skeleton from "@/components/Skeleton";
import { db } from "@/firebase/configuration";
import { Order } from "@/schemas/Order";
import { Tools } from "@/tools/Tools";
import { Timestamp, collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";

export default function NewOrders() {
    const [orders, setOrders] = useState(Order.Frontend.Form.Schema.array().parse([]));

    useEffect(() => {
        onSnapshot(query(collection(db, "orders"), where("delivered", "==", false), orderBy("date", "desc"), limit(5)), async (snapshot) => {
            const orders = snapshot.docs.map((order) => {
                return {
                    id: order.id,
                    ...order.data(),
                    date: (order.data().date as Timestamp).toDate()
                };
            });
            const validatedOrders = Order.Schema.array().parse(orders);
            const ordersWithJoinedItems = await Tools.Frontend.transformOrderFromBackend(validatedOrders);
            setOrders(ordersWithJoinedItems);
        });
    }, []);

    return <Section padding>{orders.length === 0 ? <Skeleton /> : orders.map((order) => <OrderCard key={order.id} order={order} />)}</Section>;
}
