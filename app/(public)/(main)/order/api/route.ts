import EmailFailureNotification from "@/emails/EmailFailureNotification";
import OrderConfirmation from "@/emails/OrderConfirmation";
import { General } from "@/schemas/General";
import { Order } from "@/schemas/Order";
import ResendService from "@/services/ResendService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { orderId, orderFormData } = await request.json();
    try {
        const order = Order.Frontend.Form.Schema.parse(orderFormData);
        const email = await ResendService.sendEmail([order.email], `訂單確認 - 沖繩味之賞 [#${orderId}]`, OrderConfirmation({ orderId, order }));
        if (!email.success && email.message) throw new Error(email.message);

        return NextResponse.json(General.Response.Schema.parse({ success: true, message: null }));
    } catch (error) {
        let errorMessage = "";
        if (error instanceof Error) {
            console.error("--- api/order POST Error ---", error.message);
            errorMessage = `api/order POST error - ${error.message} - orderId: ${orderId}`;
        } else {
            errorMessage = `api/order POST error - orderId: ${orderId} - ${String(error)}}`;
        }
        await ResendService.sendEmail(["tonghohin77@gmail.com"], `Email Failed [#${orderId}]`, EmailFailureNotification({ orderId, errorMessage }));
        return NextResponse.json(General.Response.Schema.parse({ success: false, message: errorMessage }));
    }
}
