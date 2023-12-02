import { Body, Container, Font, Head, Html, Preview, Tailwind } from "@react-email/components";

interface EmailFailureNotificationProps {
    orderId: string;
    errorMessage: string;
}

export default function EmailFailureNotification({ orderId, errorMessage }: EmailFailureNotificationProps) {
    return (
        <Tailwind>
            <Html style={{ fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif' }} className="bg-neutral-50 text-neutral-800">
                <Head />
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
                        format: "woff2"
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
                <Preview>Email failed [#{orderId}]</Preview>
                <Body>
                    <Container>
                        <section className="bg-yellow-400 p-4">
                            <h2>Email failed [#{orderId}]</h2>
                            <p>{errorMessage}</p>
                        </section>
                    </Container>
                </Body>
            </Html>
        </Tailwind>
    );
}
