import OrderFormContextProvider from "@/contexts/OrderFormContextProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <OrderFormContextProvider>{children}</OrderFormContextProvider>;
}
