"use client";

import InputContainer from "@/components/InputContainer";
import Section from "@/components/Section";
import SquareButton from "@/components/SquareButton";
import { General } from "@/schemas/General";
import FirebaseService from "@/services/FirebaseService";
import { useState } from "react";

export default function Login() {
    const [formData, setFormData] = useState(General.Credentials.State);
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
            await FirebaseService.logIn(formData);
        } catch (error) {
            if (error) {
                setErrorMessage("Email/Password 唔啱喎");
            }
        }
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <Section title="沖繩味之賞 Admin" backgroundColor="bg-yellow-400" padding center>
                <InputContainer>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="abc@example.com" value={formData.email} onChange={handleFormDataChange} />
                </InputContainer>
                <InputContainer>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="••••••" value={formData.password} onChange={handleFormDataChange} />
                </InputContainer>
                {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
                <SquareButton>登入</SquareButton>
            </Section>
        </form>
    );
}
