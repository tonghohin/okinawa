"use client";

import { InitialStates } from "@/InitialStates/InitialStates";
import { Tools } from "@/tools/Tools";
import { Order } from "@/types/Order";
import React, { createContext, useContext, useEffect, useState } from "react";

interface OrderFormContext {
    orderFormData: Order.Frontend;
    setOrderFormData: React.Dispatch<React.SetStateAction<Order.Frontend>>;
}

const OrderFormContext = createContext<OrderFormContext | null>(null);

export default function OrderFormContextProvider({ children }: { children: React.ReactNode }) {
    const [formDataContext, setFormDataContext] = useState<Order.Frontend>(InitialStates.Order);

    useEffect(() => {
        setFormDataContext((prevOrderFormData) => ({ ...prevOrderFormData, total: Tools.Frontend.getTotal(prevOrderFormData.items) }));
    }, [formDataContext.items]);

    return <OrderFormContext.Provider value={{ orderFormData: formDataContext, setOrderFormData: setFormDataContext }}>{children}</OrderFormContext.Provider>;
}

export function useOrderFormData() {
    const context = useContext(OrderFormContext);
    if (context) {
        return context.orderFormData;
    }
}
export function useSetOrderFormData() {
    const context = useContext(OrderFormContext);
    if (context) {
        return context.setOrderFormData;
    }
}
