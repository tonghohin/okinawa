import { General } from "@/schemas/General";
import { Resend } from "resend";

export default class ResendService {
    public static async sendEmail(to: string[], subject: string, template: React.ReactNode) {
        try {
            const apiKey = process.env.RESEND_API_KEY;
            if (!apiKey) throw new Error("Missing Resend API key");

            const resend = new Resend(apiKey);

            const result = await resend.emails.send({
                from: "order@odenokinawa.tech",
                to: to,
                subject: subject,
                react: template,
                html: ""
            });

            if (result.error) throw new Error(result.error.message);

            return General.Response.Schema.parse({ success: true, message: null });
        } catch (error) {
            let errorMessage = "";
            if (error instanceof Error) {
                console.error("--- ResendService sendEmail Error ---", error.message);
                errorMessage = error.message;
            } else {
                errorMessage = `ResendService sendEmail error - ${String(error)}`;
            }
            return General.Response.Schema.parse({ success: false, message: errorMessage });
        }
    }
}
