"use client";

import { useOrderFormData, useSetOrderFormData } from "@/contexts/OrderFormContextProvider";
import AddressInput from "./AddressInput";

export default function Form() {
    const orderFormData = useOrderFormData();
    const setOrderFormData = useSetOrderFormData();

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

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(orderFormData);
    }

    return (
        <form className="bg-yellow-400 p-4 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <label htmlFor="name">名字</label>
                <input type="text" id="name" name="name" required value={orderFormData?.name} onChange={handleFormDataChange} />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="phone">電話</label>
                <input type="tel" id="phone" name="phone" required value={orderFormData?.phone} onChange={handleFormDataChange} />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required value={orderFormData?.email} onChange={handleFormDataChange} />
            </div>
            <AddressInput />
            <div className="flex flex-col gap-2">
                <label htmlFor="comments">備註</label>
                <textarea name="comments" id="comments" value={orderFormData?.comments} onChange={handleFormDataChange} />
            </div>
            <div className="flex gap-2">
                <button type="button" value="true" className={`rounded-full px-6 py-2 hover:bg-yellow-500 transition-all ${orderFormData?.delivery ? "bg-yellow-500" : "border border-yellow-500"}`} onClick={() => handleDeliveryChange(true)}>
                    自取
                </button>
                <button type="button" value="false" className={`rounded-full px-6 py-2 hover:bg-yellow-500 transition-all ${!orderFormData?.delivery ? "bg-yellow-500" : "border border-yellow-500"}`} onClick={() => handleDeliveryChange(false)}>
                    送餐
                </button>
            </div>
            <button type="submit" className="bg-yellow-500 p-2 rounded hover:bg-yellow-600 transition-all">
                確認落單 ${orderFormData?.total || 0}
            </button>
        </form>
    );
}
5;
