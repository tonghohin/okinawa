import { General } from "@/schemas/General";

export namespace Utilities {
    export function getAddressLine(address: General.Address.Type) {
        return Object.values(address).join(" ");
    }

    export function getToday() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    }
}
