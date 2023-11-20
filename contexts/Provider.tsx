import OrderFormContextProvider from "./OrderFormContextProvider";

export default function Provider({ children }: { children: React.ReactNode }) {
    return <OrderFormContextProvider>{children}</OrderFormContextProvider>;
}
