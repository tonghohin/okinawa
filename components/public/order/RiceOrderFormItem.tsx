"use client";

import BigCircleButton from "@/components/BigCircleButton";
import ChipButton from "@/components/ChipButton";
import Modal from "@/components/Modal";
import Section from "@/components/Section";
import ToggleButton from "@/components/ToggleButton";
import { useOrderFormData, useSetOrderFormData } from "@/contexts/OrderFormContextProvider";
import { Menu } from "@/schemas/Menu";
import { Order } from "@/schemas/Order";
import { Tools } from "@/tools/Tools";
import { IconCheck, IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import OrderFormItem from "./OrderFormItem";

interface RiceOrderFormItemProps {
    rice: Menu.Rice.Item.Type;
    addOns: Menu.Rice.Item.Type[];
}

export default function RiceOrderFormItem({ rice, addOns }: RiceOrderFormItemProps) {
    const orderFormData = useOrderFormData();
    const setOrderFormData = useSetOrderFormData();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [riceOrderFormData, setRiceOrderFormData] = useState(Order.RiceItem.Frontend.State(rice));

    const itemCount = useMemo(() => (orderFormData ? Tools.Frontend.getNumberOfItems(orderFormData.items, "rice", rice.id) : 0), [orderFormData]);

    const isValidOrder = riceOrderFormData.quantity > 0;

    function handleQuantityChange(increment: boolean) {
        if (increment) {
            setRiceOrderFormData((prevRiceOrderFormData) => ({ ...prevRiceOrderFormData, quantity: prevRiceOrderFormData.quantity + 1 }));
        } else {
            setRiceOrderFormData((prevRiceOrderFormData) => {
                return prevRiceOrderFormData.quantity > 0 ? { ...prevRiceOrderFormData, quantity: prevRiceOrderFormData.quantity - 1 } : prevRiceOrderFormData;
            });
        }
    }

    function handleToUdonChange(toUdon: boolean) {
        if (toUdon) {
            setRiceOrderFormData((prevRiceOrderFormData) => ({ ...prevRiceOrderFormData, toUdon: true }));
        } else {
            setRiceOrderFormData((prevRiceOrderFormData) => ({ ...prevRiceOrderFormData, toUdon: false }));
        }
    }

    function handleAddOnChange(addOnId: String | null) {
        const selectedAddOn = addOns.find((addOn) => addOn.id === addOnId);
        setRiceOrderFormData((prevRiceOrderFormData) => ({ ...prevRiceOrderFormData, addOn: selectedAddOn || null }));
    }

    function handleAddToCart() {
        if (riceOrderFormData.quantity > 0) {
            if (orderFormData && setOrderFormData) {
                const isSameOrderExists = Tools.Frontend.checkOrderExists(orderFormData, riceOrderFormData, "rice");
                setOrderFormData((prevOrderFormData) => ({
                    ...prevOrderFormData,
                    items: {
                        ...prevOrderFormData.items,
                        rice: isSameOrderExists === false ? [...prevOrderFormData.items.rice, riceOrderFormData] : prevOrderFormData.items.rice.map((riceOrderItem, index) => (index === isSameOrderExists ? { ...riceOrderItem, quantity: riceOrderItem.quantity + riceOrderFormData.quantity } : riceOrderItem))
                    }
                }));
            }
        }
        setIsModalOpen(false);
        setRiceOrderFormData(Order.RiceItem.Frontend.State(rice));
    }

    return (
        <>
            <OrderFormItem orderItem={rice} orderItemCategory="rice" setIsModalOpen={setIsModalOpen} />
            {isModalOpen && (
                <Modal setIsModalOpen={setIsModalOpen} closeButton>
                    <Section title={`${rice.name} $${rice.price}`}>
                        <Section center>
                            <span>轉烏冬</span>
                            <div className="flex items-center gap-4">
                                <ToggleButton on={riceOrderFormData.toUdon} onClick={() => handleToUdonChange(true)}>
                                    <IconCheck className="text-yellow-800" size={24} />
                                </ToggleButton>
                                <ToggleButton on={!riceOrderFormData.toUdon} onClick={() => handleToUdonChange(false)}>
                                    <IconX className="text-yellow-800" size={24} />
                                </ToggleButton>
                            </div>
                        </Section>
                        <Section center>
                            <span>轉套餐</span>
                            <div className="flex gap-4 flex-wrap justify-center">
                                {addOns.map((addOn) => (
                                    <ToggleButton key={addOn.id} on={riceOrderFormData.addOn?.id === addOn.id} onClick={() => handleAddOnChange(addOn.id)}>
                                        {addOn.name} ＋${addOn.price}
                                    </ToggleButton>
                                ))}
                                <ToggleButton on={!riceOrderFormData.addOn} onClick={() => handleAddOnChange(null)}>
                                    唔使了
                                </ToggleButton>
                            </div>
                        </Section>
                        <div className="flex gap-4 items-center self-center">
                            <BigCircleButton className="text-yellow-800 bg-yellow-400" onClick={() => handleQuantityChange(false)} disabled={riceOrderFormData.quantity === 0}>
                                <IconMinus size={24} />
                            </BigCircleButton>
                            <span className="text-xl">{riceOrderFormData.quantity}</span>
                            <BigCircleButton className="text-yellow-800 bg-yellow-400" onClick={() => handleQuantityChange(true)}>
                                <IconPlus size={24} />
                            </BigCircleButton>
                        </div>
                        <ChipButton className="self-center bg-sky-700" onClick={handleAddToCart} disabled={!isValidOrder}>
                            <span>加落購物車</span>
                            <span>${Tools.Frontend.getOrderSubtotal(riceOrderFormData) || rice.price}</span>
                        </ChipButton>
                    </Section>
                </Modal>
            )}
        </>
    );
}
