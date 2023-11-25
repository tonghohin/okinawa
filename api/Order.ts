import { Order } from "@/schemas/Order";

export namespace OrderApi {
    export async function sendEmail(orderId: string, orderFormData: Order.Frontend.Form.Type) {
        await fetch("/order/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ orderId, orderFormData })
        });
    }
}
