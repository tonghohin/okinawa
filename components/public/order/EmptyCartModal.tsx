import ChipLink from "@/components/ChipLink";
import Modal from "@/components/Modal";
import emptyCart from "@/public/emptyCart.svg";
import Image from "next/image";


export default function EmptyCartModal() {
    return (
        <Modal >
            <span>你個購物車空嘅！</span>
            <span>快d去落order！</span>
            <Image src={emptyCart} width={300} height={200} alt="Empty Cart" priority />
            <ChipLink href="/order" className="bg-yellow-500">
                落Order
            </ChipLink>
        </Modal>
    );
}
