import { Resend } from "resend";

export default class ResendService {
    public static async sendEmail(to: string[], subject: string, template: React.ReactNode) {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            throw new Error("Missing Resend API key");
        }
        const resend = new Resend(apiKey);

        try {
            const data = await resend.emails.send({
                from: "onboarding@resend.dev",
                to: to,
                subject: subject,
                html: "template",
                react: template
            });
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}
