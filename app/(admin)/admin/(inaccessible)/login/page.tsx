"use client";

import { logIn } from "@/contexts/AuthContextProvider";
import { useState } from "react";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");

    function handleFormDataChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            };
        });
    }

    async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await logIn(formData);
        } catch (error) {
            if (error) {
                setErrorMessage("Email/Password 唔啱喎");
            }
        }
    }

    return (
        <form className="bg-yellow-500 rounded flex flex-col justify-around gap-4 p-4" onSubmit={handleFormSubmit}>
            <h1 className="text-lg text-center">沖繩味之賞 Admin</h1>
            <section className="flex flex-col items-center justify-around gap-2">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" className="bg-neutral-50 p-2 rounded" placeholder="abc@example.com" value={formData.email} onChange={handleFormDataChange} />
            </section>
            <section className="flex flex-col items-center justify-around gap-2">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" className="bg-neutral-50 p-2 rounded" placeholder="••••••" value={formData.password} onChange={handleFormDataChange} />
            </section>
            {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
            <button className="bg-yellow-400 p-2 rounded hover:bg-yellow-600 hover:text-neutral-50 transition-all">登入</button>
        </form>
    );
}
