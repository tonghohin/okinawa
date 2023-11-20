"use client";

import Loading from "@/components/Loading";
import { useOrderFormData, useSetOrderFormData } from "@/contexts/OrderFormContextProvider";
import FirestoreService from "@/firestore/FirestoreService";
import { Tools } from "@/tools/Tools";
import { useState } from "react";
import AddressInput from "./AddressInput";
import { useRouter } from "next/navigation";

export default function Form() {
    const router = useRouter();

    const orderFormData = useOrderFormData();
    const setOrderFormData = useSetOrderFormData();

    const [isLoading, setIsLoading] = useState(false);

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

    return (
        <form className="bg-yellow-400 p-4 flex flex-col gap-4 flex-1" onSubmit={handleFormSubmit}>
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
                <button type="button" value="true" className={`rounded-full px-6 py-2 hover:bg-yellow-500 transition-all ${!orderFormData?.delivery ? "bg-yellow-500" : "border border-yellow-500"}`} onClick={() => handleDeliveryChange(false)}>
                    自取
                </button>
                <button type="button" value="false" className={`rounded-full px-6 py-2 hover:bg-yellow-500 transition-all ${orderFormData?.delivery ? "bg-yellow-500" : "border border-yellow-500"}`} onClick={() => handleDeliveryChange(true)}>
                    送餐
                </button>
            </div>
            {orderFormData?.delivery ? <AddressInput /> : <p>地址：葵涌 梨木道32-50號 金運工業大廈 第二座 Foodie City</p>}
            <div className="flex flex-col gap-1">
                <label htmlFor="comments">備註</label>
                <textarea name="comments" id="comments" value={orderFormData?.comments} onChange={handleFormDataChange} />
            </div>
            <button type="submit" className="bg-yellow-500 p-4 rounded hover:bg-yellow-600 transition-all">
                {isLoading ? <Loading /> : <span>確認落單 ${orderFormData?.total || 0}</span>}
            </button>
        </form>
    );
}
5;
