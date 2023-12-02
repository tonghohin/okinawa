import AuthContextProvider from "./AuthContextProvider";

export default function Provider({ children }: { children: React.ReactNode }) {
    return <AuthContextProvider>{children}</AuthContextProvider>;
}
