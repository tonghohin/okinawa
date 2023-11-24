import { Order } from "@/schemas/Order";
import { Body, Column, Container, Font, Head, Hr, Html, Preview, Row, Section, Tailwind } from "@react-email/components";

interface OrderConfirmationProps {
    orderId: string;
    order: Order.Frontend.Form.Type;
}

export default function OrderConfirmation({ orderId, order }: OrderConfirmationProps) {
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
                <Preview>訂單確認 - 沖繩味之賞 [{orderId}]</Preview>
                <Body>
                    <Container>
                        <section className="bg-yellow-400 p-4">
                            <h2>訂單確認 - 沖繩味之賞 [{orderId}]</h2>
                            <p>Hello {order.name}!</p>
                            <p>好消息！我們已經收到您嘅訂單！</p>
                        </section>
                        <Section className="p-4">
                            <p className="text-xl">訂單詳情</p>
                            <Hr className="border-yellow-500" />
                            <p>訂單編號：{orderId}</p>
                            <p>訂單日期：{order.date.toLocaleDateString()}</p>
                            {order.delivery && order.address ? <p>送餐地址：{Object.values(order.address).join(" ")}</p> : <p>自取地址：葵涌 梨木道32-50號 金運工業大廈 第二座 Foodie City</p>}
                        </Section>
                        <Section className="p-4">
                            <p className="text-xl">美食</p>
                            <Hr className="border-yellow-500" />
                            {order.items.rice.map((rice) => (
                                <Row>
                                    <Column>
                                        <p>
                                            <span>
                                                {rice.quantity} x {rice.item.name}{" "}
                                            </span>
                                            {rice.addOn && <span>（配{rice.addOn.name} </span>}
                                        </p>
                                    </Column>
                                    <Column>
                                        <p className="text-end">${(rice.item.price + (rice.addOn?.price || 0)) * rice.quantity}</p>
                                    </Column>
                                </Row>
                            ))}
                            {order.items.noodles.map((noodle) => (
                                <Row>
                                    <Column>
                                        <p>
                                            <span>
                                                {noodle.quantity} x {noodle.item.name}{" "}
                                            </span>
                                            {!!noodle.addOns.length && <span>（配{noodle.addOns.map((addOn) => addOn.name).join("，")}）</span>}
                                        </p>
                                    </Column>
                                    <Column>
                                        <p className="text-end">${(noodle.addOns.reduce((total, addOn) => (total += addOn.price), 0) + noodle.item.price) * noodle.quantity}</p>
                                    </Column>
                                </Row>
                            ))}
                            {order.items.snacks.map((snack) => (
                                <Row>
                                    <Column>
                                        <p>
                                            <span>
                                                {snack.quantity} x {snack.item.name}{" "}
                                            </span>
                                        </p>
                                    </Column>
                                    <Column>
                                        <p className="text-end">${snack.item.price * snack.quantity}</p>
                                    </Column>
                                </Row>
                            ))}
                        </Section>
                        <Section className="bg-yellow-400 p-4">
                            <Row>
                                <Column>
                                    <h3>總計</h3>
                                </Column>
                                <Column>
                                    <p className="text-end">${order.total}</p>
                                </Column>
                            </Row>
                        </Section>
                    </Container>
                </Body>
            </Html>
        </Tailwind>
    );
}
