"use client";

import ChipButton from "@/components/ChipButton";
import FirestoreService from "@/services/FirestoreService";

interface CompleteOrderProps {
    orderId: string;
}

export default function CompleteOrder({ orderId }: CompleteOrderProps) {
    return (
        <ChipButton className="bg-green-700" onClick={() => FirestoreService.updateOrder(orderId, { delivered: true })}>
            完成訂單
        </ChipButton>
    );
}
