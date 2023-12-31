"use client";

import BigCircleButton from "@/components/BigCircleButton";
import ChipButton from "@/components/ChipButton";
import Modal from "@/components/Modal";
import Section from "@/components/Section";
import ToggleButton from "@/components/ToggleButton";
import { Menu } from "@/schemas/Menu";
import { Order } from "@/schemas/Order";
import useOrderFormDataStore from "@/stores/orderFormDataStore";
import { Tools } from "@/tools/Tools";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import OrderFormItem from "./OrderFormItem";

interface NoodlesOrderFormItemProps {
    noodles: Menu.Noodles.Item.Type;
    addOns: Menu.Noodles.Item.Type[];
}

export default function NoodlesOrderFormItem({ noodles, addOns }: NoodlesOrderFormItemProps) {
    const updateOrder = useOrderFormDataStore((state) => state.updateOrder);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [noodlesOrderFormData, setNoodlesOrderFormData] = useState<Order.NoodlesItem.Frontend.Type>(Order.NoodlesItem.Frontend.State(noodles));

    const isValidOrder = noodlesOrderFormData.quantity > 0 && noodlesOrderFormData.addOns.length >= noodles.minimumAddOns;

    function handleQuantityChange(increment: boolean) {
        if (increment) {
            setNoodlesOrderFormData((prevNoodlesOrderFromData) => ({ ...prevNoodlesOrderFromData, quantity: prevNoodlesOrderFromData.quantity + 1 }));
        } else {
            setNoodlesOrderFormData((prevNoodlesOrderFromData) => {
                return prevNoodlesOrderFromData.quantity > 0 ? { ...prevNoodlesOrderFromData, quantity: prevNoodlesOrderFromData.quantity - 1 } : prevNoodlesOrderFromData;
            });
        }
    }

    function handleAddOnsChange(addOnId: string) {
        const addOn = addOns.find((addOn) => addOn.id === addOnId);
        if (addOn) {
            setNoodlesOrderFormData((prevNoodlesOrderFormData) => (prevNoodlesOrderFormData.addOns.find((addOn) => addOn.id === addOnId) ? { ...prevNoodlesOrderFormData, addOns: prevNoodlesOrderFormData.addOns.filter((addOn) => addOn.id !== addOnId) } : { ...prevNoodlesOrderFormData, addOns: [...prevNoodlesOrderFormData.addOns, addOn] }));
        }
    }

    function handleAddToCart() {
        if (noodlesOrderFormData.quantity > 0) {
            updateOrder(noodlesOrderFormData, "noodles");
        }
        setIsModalOpen(false);
        setNoodlesOrderFormData(Order.NoodlesItem.Frontend.State(noodles));
    }

    return (
        <>
            <OrderFormItem orderItem={noodles} orderItemCategory="noodles" setIsModalOpen={setIsModalOpen} />
            {isModalOpen && (
                <Modal setIsModalOpen={setIsModalOpen} closeButton>
                    <Section title={`${noodles.name} $${noodles.price}`}>
                        <h1 className="text-lg text-center">
                            <span>{Menu.Noodles.Categories.Mapping.addOn}配料</span> <span>{noodles.minimumAddOns ? `（${noodles.minimumAddOns}款起）` : "（唔加都得）"}</span>
                        </h1>
                        <div className="flex flex-col overflow-auto">
                            {Object.entries(Tools.Frontend.groupNoodlesAddOnsByPrice(addOns)).map(([price, addOn], index) => (
                                <section key={index} className="flex gap-4 items-center border-b border-b-yellow-500 flex-wrap py-4">
                                    {addOn.map((addOn) => (
                                        <ToggleButton key={addOn.id} on={!!noodlesOrderFormData.addOns.find((formAddOn) => formAddOn.id === addOn.id)} onClick={() => handleAddOnsChange(addOn.id)}>
                                            <span>{addOn.name}</span>
                                            <span>＋${addOn.price}</span>
                                        </ToggleButton>
                                    ))}
                                </section>
                            ))}
                        </div>
                        <div className="flex gap-4 items-center self-center">
                            <BigCircleButton className="text-yellow-800 bg-yellow-400" onClick={() => handleQuantityChange(false)} disabled={noodlesOrderFormData.quantity === 0}>
                                <IconMinus size={24} />
                            </BigCircleButton>
                            <span className="text-xl">{noodlesOrderFormData.quantity}</span>
                            <BigCircleButton className="text-yellow-800 bg-yellow-400" onClick={() => handleQuantityChange(true)}>
                                <IconPlus size={24} />
                            </BigCircleButton>
                        </div>
                        <ChipButton className="self-center bg-sky-700" onClick={handleAddToCart} disabled={!isValidOrder}>
                            <span className="text-neutral-50">加落購物車</span>
                            <span className="text-neutral-50">${Tools.Frontend.getOrderSubtotal(noodlesOrderFormData) || noodles.price}</span>
                        </ChipButton>
                    </Section>
                </Modal>
            )}
        </>
    );
}
