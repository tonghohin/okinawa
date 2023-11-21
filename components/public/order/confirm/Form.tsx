"use client";

import Loading from "@/components/Loading";
import Section from "@/components/Section";
import ToggleButton from "@/components/ToggleButton";
import { useOrderFormData, useSetOrderFormData } from "@/contexts/OrderFormContextProvider";
import FirestoreService from "@/firestore/FirestoreService";
import { Tools } from "@/tools/Tools";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EmptyCartModal from "../EmptyCartModal";
import AddressInput from "./AddressInput";

export default function Form() {
    const router = useRouter();

    const orderFormData = useOrderFormData();
    const setOrderFormData = useSetOrderFormData();

    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(orderFormData?.total === 0);

    function handleFormDataChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (setOrderFormData) {
            setOrderFormData((prevOrderFormData) => ({ ...prevOrderFormData, [event.target.name]: event.target.value }));
        }
    }

    function handleDeliveryChange(isDelivery: boolean) {
        if (setOrderFormData) {
            setOrderFormData((prevOrderFormData) => ({ ...prevOrderFormData, delivery: isDelivery }));
        }
    }

    async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            setIsLoading(true);

            if (orderFormData) {
                const transformedData = Tools.Frontend.transformOrderFormData(orderFormData);
                await FirestoreService.getInstance().createOrder(transformedData);
                router.push("/order/confirm/success");
            }
        } catch (error) {
            setIsLoading(false);
        }
    }

    return orderFormData?.total === 0 ? (
        <EmptyCartModal setIsModalOpen={setIsModalOpen} />
    ) : (
        <form className="bg-yellow-400 p-4" onSubmit={handleFormSubmit}>
            <Section>
                <div className="flex flex-col gap-1">
                    <label htmlFor="name">名字</label>
                    <input type="text" id="name" name="name" required value={orderFormData?.name} onChange={handleFormDataChange} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="phone">電話</label>
                    <input type="tel" id="phone" name="phone" required value={orderFormData?.phone} onChange={handleFormDataChange} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required value={orderFormData?.email} onChange={handleFormDataChange} />
                </div>
                <div className="flex gap-1">
                    <ToggleButton on={!orderFormData?.delivery} onClick={() => handleDeliveryChange(false)}>
                        自取
                    </ToggleButton>
                    <ToggleButton on={!!orderFormData?.delivery} onClick={() => handleDeliveryChange(true)}>
                        送餐
                    </ToggleButton>
                </div>
                {orderFormData?.delivery ? <AddressInput /> : <p>地址：葵涌 梨木道32-50號 金運工業大廈 第二座 Foodie City</p>}
                <div className="flex flex-col gap-1">
                    <label htmlFor="comments">備註</label>
                    <textarea name="comments" id="comments" value={orderFormData?.comments} onChange={handleFormDataChange} />
                </div>
                <button type="submit" className="bg-yellow-500 p-4 rounded hover:bg-yellow-600 transition-all">{isLoading ? <Loading /> : <span>確認落單 ${orderFormData?.total || 0}</span>}</button>
            </Section>
        </form>
    );
}
5;
