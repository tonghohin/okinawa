"use client";

import { InitialStates } from "@/InitialStates/InitialStates";
import BigCircleButton from "@/components/BigCircleButton";
import ChipButton from "@/components/ChipButton";
import CircleButton from "@/components/CircleButton";
import Modal from "@/components/Modal";
import Section from "@/components/Section";
import ToggleButton from "@/components/ToggleButton";
import { useOrderFormData, useSetOrderFormData } from "@/contexts/OrderFormContextProvider";
import { Menu } from "@/schemas/Menu";
import { Order } from "@/schemas/Order";
import { Tools } from "@/tools/Tools";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useMemo, useState } from "react";

interface NoodlesOrderFormItemProps {
    noodles: Menu.Noodles.Item.Type;
    addOns: Menu.Noodles.Item.Type[];
}

export default function NoodlesOrderFormItem({ noodles, addOns }: NoodlesOrderFormItemProps) {
    const orderFormData = useOrderFormData();
    const setOrderFormData = useSetOrderFormData();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [noodlesOrderFormData, setNoodlesOrderFormData] = useState<Order.NoodlesItem.Frontend.Type>(InitialStates.NoodlesOrderItem(noodles));

    const itemCount = useMemo(() => (orderFormData ? Tools.Frontend.getNumberOfItems(orderFormData.items, "noodles", noodles.id) : 0), [orderFormData]);

    const isValidOrder = noodlesOrderFormData.quantity > 0 && noodlesOrderFormData.addOns.length >= (noodles.minimumAddOns || 0);

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
            if (orderFormData && setOrderFormData) {
                const isSameOrderExists = Tools.Frontend.checkOrderExists(orderFormData, noodlesOrderFormData, "noodles");
                setOrderFormData((prevOrderFormData) => ({
                    ...prevOrderFormData,
                    items: {
                        ...prevOrderFormData.items,
                        noodles: isSameOrderExists === false ? [...prevOrderFormData.items.noodles, noodlesOrderFormData] : prevOrderFormData.items.noodles.map((noodlesOrderItem, index) => (index === isSameOrderExists ? { ...noodlesOrderItem, quantity: noodlesOrderItem.quantity + noodlesOrderFormData.quantity } : noodlesOrderItem))
                    }
                }));
            }
        }
        setIsModalOpen(false);
        setNoodlesOrderFormData(InitialStates.NoodlesOrderItem(noodles));
    }

    return (
        <>
            <section className="flex gap-4 items-center justify-between border border-yellow-500 rounded p-2 cursor-pointer hover:bg-yellow-500 transition-all" onClick={() => setIsModalOpen(true)}>
                <span>{noodles.name}</span>
                <div className="flex items-center gap-4">
                    {itemCount > 0 && (
                        <div className="flex items-center justify-center w-6 h-6 text-xs rounded-full bg-sky-700/80 text-neutral-50">
                            <span>{itemCount}</span>
                        </div>
                    )}
                    <span>${noodles.price}</span>
                    <CircleButton className="bg-yellow-500">
                        <IconPlus size={18} />
                    </CircleButton>
                </div>
            </section>
            {isModalOpen && (
                <Modal setIsModalOpen={setIsModalOpen} closeButton>
                    <Section title={`${noodles.name} $${noodles.price}`}>
                        <h1 className="text-lg text-center">
                            <span>{Menu.Noodles.Categories.Mapping.addOn}配料</span> <span>{noodles.minimumAddOns ? `（${noodles.minimumAddOns}款起）` : "（唔加都得）"}</span>
                        </h1>
                        <div className="flex flex-col overflow-auto">
                            {Object.entries(Tools.Frontend.groupNoodlesAddOnsByPrice(addOns)).map(([price, addOn]) => (
                                <section className="flex gap-4 items-center border-b border-b-yellow-500 flex-wrap py-4">
                                    {addOn.map((addOn) => (
                                        <ToggleButton on={!!noodlesOrderFormData.addOns.find((formAddOn) => formAddOn.id === addOn.id)} onClick={() => handleAddOnsChange(addOn.id)}>
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
                            <span>加落購物車</span>
                            <span>${Tools.Frontend.getOrderSubtotal(noodlesOrderFormData) || noodles.price}</span>
                        </ChipButton>
                    </Section>
                </Modal>
            )}
        </>
    );
}
