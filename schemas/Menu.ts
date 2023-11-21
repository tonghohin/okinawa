import { z } from "zod";

export namespace Menu {
    export namespace Categories {
        export const Mapping = {
            rice: "丼飯",
            snacks: "小食",
            noodles: "自選日式車仔麵/關東煮"
        };

        export const Enum = z.enum(["rice", "snacks", "noodles"]);
        export type Type = z.infer<typeof Enum>;
    }

    export namespace Rice {
        export namespace Categories {
            export const Mapping = {
                beef: "牛肉丼",
                pork: "炙燒豚肉丼",
                combo: "豪華二重奏丼",
                eel: "蒲燒鰻魚丼",
                chicken: "照燒烤雞丼",
                curry: "濃厚日式咖哩丼",
                addOn: "套餐"
            };

            export const Enum = z.enum(["beef", "pork", "combo", "eel", "chicken", "curry", "addOn"]);
            export type Type = z.infer<typeof Enum>;
        }

        export namespace Item {
            export const Schema = z.object({
                id: z.string(),
                category: Categories.Enum,
                name: z.string(),
                price: z.number()
            });

            export type Type = z.infer<typeof Schema>;
        }
    }

    export namespace Noodles {
        export namespace Categories {
            export const Mapping = {
                main: "主食",
                addOn: "追加"
            };

            export const Enum = z.enum(["main", "addOn"]);
            export type Type = z.infer<typeof Enum>;
        }

        export namespace Item {
            export const Schema = z.object({
                id: z.string(),
                category: Categories.Enum,
                name: z.string(),
                price: z.number(),
                minimumAddOns: z.optional(z.number())
            });

            export type Type = z.infer<typeof Schema>;
        }
    }

    export namespace Snacks {
        export namespace Item {
            export const Schema = z.object({
                id: z.string(),
                name: z.string(),
                price: z.number()
            });

            export type Type = z.infer<typeof Schema>;
        }
    }
}
