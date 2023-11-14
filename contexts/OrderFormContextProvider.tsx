"use client";

import { Order } from "@/types/Order";
import React, { createContext, useContext, useState } from "react";

interface OrderFormContext {
    orderFormData: Order;
    setOrderFormData: React.Dispatch<React.SetStateAction<Order>>;
}

const OrderFormContext = createContext<OrderFormContext | null>(null);

export default function OrderFormContextProvider({ children }: { children: React.ReactNode }) {
    const [formDataContext, setFormDataContext] = useState<Order>({
        id: "",
        name: "",
        email: "",
        phone: "",
        items: {
            rice: [],
            noodles: [],
            snacks: []
        },
        total: 0,
        delivery: false,
        address: "",
        date: new Date(),
        comments: ""
    });

    return <OrderFormContext.Provider value={{ orderFormData: formDataContext, setOrderFormData: setFormDataContext }}>{children}</OrderFormContext.Provider>;
}

export function useOrderFormData() {
    return useContext(OrderFormContext)?.orderFormData;
}
export function useSetOrderFormData() {
    return useContext(OrderFormContext)?.setOrderFormData;
}
