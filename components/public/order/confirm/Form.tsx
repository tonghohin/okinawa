"use client";

import { OrderApi } from "@/api/Order";
import InputContainer from "@/components/InputContainer";
import Loading from "@/components/Loading";
import Section from "@/components/Section";
import SquareButton from "@/components/SquareButton";
import ToggleButton from "@/components/ToggleButton";
import FirestoreService from "@/services/FirestoreService";
import useOrderFormDataStore from "@/stores/orderFormDataStore";
import { Tools } from "@/tools/Tools";
import { IconAlertCircle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EmptyCartModal from "../EmptyCartModal";
import AddressInput from "./AddressInput";

export default function Form() {
    const router = useRouter();

    const orderFormData = useOrderFormDataStore((state) => state.formData);
    const updateDelivery = useOrderFormDataStore((state) => state.updateDelivery);
    const updateFormData = useOrderFormDataStore((state) => state.updateFormData);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            setIsLoading(true);

            const transformedData = Tools.Frontend.transformOrderFormData({ ...orderFormData, date: new Date() });
            const createdOrderId = await FirestoreService.createOrder(transformedData);
            if (createdOrderId) {
                await OrderApi.sendEmail(createdOrderId, orderFormData);
            }
            router.push("/order/success");
        } catch (error) {
            setIsLoading(false);
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("落單唔成功，請試多次！");
            }
        }
    }

    return orderFormData.total === 0 ? (
        <EmptyCartModal />
    ) : (
        <form onSubmit={handleFormSubmit}>
            <Section backgroundColor="bg-yellow-400" padding>
                {errorMessage && (
                    <div className="flex justify-center items-center gap-2">
                        <IconAlertCircle size={24} color="#dc2626" />
                        <span className="text-red-600">{errorMessage}</span>
                    </div>
                )}
                <InputContainer>
                    <label htmlFor="name">名字</label>
                    <input type="text" id="name" name="name" required value={orderFormData.name} onChange={updateFormData} />
                </InputContainer>
                <InputContainer>
                    <label htmlFor="phone">電話</label>
                    <input type="tel" id="phone" name="phone" required value={orderFormData.phone} onChange={updateFormData} />
                </InputContainer>
                <InputContainer>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required value={orderFormData.email} onChange={updateFormData} />
                </InputContainer>
                <div className="flex gap-4">
                    <ToggleButton on={!orderFormData.delivery} onClick={() => updateDelivery(false)}>
                        自取
                    </ToggleButton>
                    <ToggleButton on={!!orderFormData.delivery} onClick={() => updateDelivery(true)}>
                        送餐
                    </ToggleButton>
                </div>
                {orderFormData.delivery ? <AddressInput /> : <p>地址：葵涌 梨木道32-50號 金運工業大廈 第二座 Foodie City</p>}
                <InputContainer>
                    <label htmlFor="comments">備註</label>
                    <textarea name="comments" id="comments" value={orderFormData.comments || ""} onChange={updateFormData} />
                </InputContainer>
                <SquareButton>{isLoading ? <Loading /> : <span>確認落單 ${orderFormData.total}</span>}</SquareButton>
            </Section>
        </form>
    );
}
5;
