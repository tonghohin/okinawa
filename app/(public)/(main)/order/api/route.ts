import OrderConfirmation from "@/emails/OrderConfirmation";
import { Order } from "@/schemas/Order";
import ResendService from "@/services/ResendService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { orderId, orderFormData } = await request.json();
    const order = Order.Frontend.Form.Schema.parse(orderFormData);
    const email = await ResendService.sendEmail([order.email], `訂單確認 - 沖繩味之賞 [#${orderId}]`, OrderConfirmation({ orderId, order }));
    return NextResponse.json("end");
}
