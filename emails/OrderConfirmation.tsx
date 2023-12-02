import { Utilities } from "@/Utilities/Utilities";
import { Order } from "@/schemas/Order";
import { Tools } from "@/tools/Tools";
import { Body, Column, Container, Font, Head, Hr, Html, Link, Preview, Row, Tailwind } from "@react-email/components";

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
                            <h2>訂單確認 - 沖繩味之賞 [#{orderId}]</h2>
                            <p className="text-lg">Hello {order.name}!</p>
                            <p className="text-lg">好消息！我們已經收到您嘅訂單！</p>
                        </section>
                        <section className="p-4 border-2">
                            <p className="text-xl">訂單詳情</p>
                            <Hr className="border-yellow-500" />
                            <p>訂單編號：#{orderId}</p>
                            <p>訂單日期：{order.date.toLocaleDateString()}</p>
                            {order.delivery && order.address ? <p>送餐地址：{Utilities.getAddressLine(order.address)}</p> : <p>自取地址：葵涌 梨木道32-50號 金運工業大廈 第二座 Foodie City</p>}
                            {order.comments && <p>備註：{order.comments}</p>}
                        </section>
                        <section className="p-4">
                            <p className="text-xl">美食</p>
                            <Hr className="border-yellow-500" />
                            {order.items.rice.map((rice, index) => (
                                <Row key={index}>
                                    <Column>
                                        <p>
                                            <span>{rice.item.name}</span>
                                            {rice.addOn && <span>（配{rice.addOn.name}）</span>}
                                        </p>
                                    </Column>
                                    <Column>
                                        <p className="text-end">
                                            <span>${Tools.Frontend.getEachItemPrice(rice)}</span>
                                            <span> x {rice.quantity}</span>
                                        </p>
                                    </Column>
                                </Row>
                            ))}
                            {order.items.noodles.map((noodle, index) => (
                                <Row key={index}>
                                    <Column>
                                        <p>
                                            <span>{noodle.item.name}</span>
                                            {!!noodle.addOns.length && <span>（配{noodle.addOns.map((addOn) => addOn.name).join("，")}）</span>}
                                        </p>
                                    </Column>
                                    <Column>
                                        <p className="text-end">
                                            <span>${Tools.Frontend.getEachItemPrice(noodle)}</span>
                                            <span> x {noodle.quantity}</span>
                                        </p>
                                    </Column>
                                </Row>
                            ))}
                            {order.items.snacks.map((snack, index) => (
                                <Row key={index}>
                                    <Column>
                                        <p>
                                            <span>{snack.item.name}</span>
                                        </p>
                                    </Column>
                                    <Column>
                                        <p className="text-end">
                                            <span>${Tools.Frontend.getEachItemPrice(snack)}</span>
                                            <span> x {snack.quantity}</span>
                                        </p>
                                    </Column>
                                </Row>
                            ))}
                            <Hr className="border-yellow-500" />
                            <Row>
                                <Column>
                                    <h3>總計</h3>
                                </Column>
                                <Column>
                                    <h3 className="text-end">${order.total}</h3>
                                </Column>
                            </Row>
                        </section>
                        <section className="bg-yellow-400 p-4 text-center">
                            <h3>有咩問題歡迎搵我地！</h3>
                            <p>
                                地址：
                                <Link href="https://maps.app.goo.gl/SntJopHUUbAEf1zo6" className="text-neutral-800 underline">
                                    葵涌 梨木道32-50號 金運工業大廈 第二座 Foodie City
                                </Link>
                            </p>

                            <p>
                                電話：
                                <Link href="tel:95582500" className="text-neutral-800 underline">
                                    +852 9558 2500
                                </Link>
                            </p>
                            <p>
                                WhatsApp:{" "}
                                <Link href="https://api.whatsapp.com/send?phone=85263439624" className="text-neutral-800 underline">
                                    +852 6343 9624
                                </Link>
                            </p>
                            <p className="text-xs">請勿回覆此電郵，如有任何查詢，請致電或WhatsApp我們，謝謝！</p>
                        </section>
                    </Container>
                </Body>
            </Html>
        </Tailwind>
    );
}
