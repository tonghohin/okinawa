import { z } from "zod";
import { General } from "./General";
import { Menu } from "./Menu";

export namespace Order {
    export namespace RiceItem {
        export const Schema = z.object({
            id: z.string().readonly(),
            quantity: z.number().finite().safe().int().min(0).default(0),
            toUdon: z.boolean().default(false),
            addOn: z.string().nullable().default(null)
        });

        export type Type = z.infer<typeof Schema>;
        export namespace Frontend {
            export const Schema = RiceItem.Schema.omit({ id: true }).extend({
                item: Menu.Rice.Item.Schema,
                addOn: Menu.Rice.Item.Schema.nullable().default(null)
            });

            export type Type = z.infer<typeof Schema>;
        }
    }

    export namespace NoodlesItem {
        export const Schema = z.object({
            id: z.string().readonly(),
            quantity: z.number().finite().safe().int().min(0).default(0),
            addOns: z.array(z.string()).default([])
        });

        export type Type = z.infer<typeof Schema>;

        export namespace Frontend {
            export const Schema = NoodlesItem.Schema.omit({ id: true }).extend({
                item: Menu.Noodles.Item.Schema,
                addOns: z.array(Menu.Noodles.Item.Schema).default([])
            });

            export type Type = z.infer<typeof Schema>;
        }
    }

    export namespace SnacksItem {
        export const Schema = z.object({
            id: z.string().readonly(),
            quantity: z.number().finite().safe().int().min(0).default(0)
        });

        export type Type = z.infer<typeof Schema>;
        export namespace Frontend {
            export const Schema = SnacksItem.Schema.omit({ id: true }).extend({
                item: Menu.Snacks.Item.Schema
            });

            export type Type = z.infer<typeof Schema>;
        }
    }

    export namespace Items {
        export const Schema = z.object({
            rice: z.array(RiceItem.Schema).default([]),
            noodles: z.array(NoodlesItem.Schema).default([]),
            snacks: z.array(SnacksItem.Schema).default([])
        });

        export type Type = z.infer<typeof Schema>;

        export namespace Frontend {
            export const Schema = z.object({
                rice: z.array(RiceItem.Frontend.Schema).default([]),
                noodles: z.array(NoodlesItem.Frontend.Schema).default([]),
                snacks: z.array(SnacksItem.Frontend.Schema).default([])
            });

            export type Type = z.infer<typeof Schema>;
        }
    }

    export const Schema = z.object({
        id: z.string().readonly(),
        name: z.string().trim().length(1, { message: "未寫名" }).default(""),
        email: z.string().trim().email().toLowerCase().default(""),
        phone: z.string().trim().length(8, { message: "電話號碼要係8個字" }).default(""),
        items: Items.Schema,
        total: z.number().finite().safe().min(0).default(0),
        delivery: z.boolean().default(false),
        address: General.Address.Schema.nullable().default(null),
        date: z.date().min(new Date(), { message: "回到未來" }).default(new Date()),
        comments: z.string().trim().nullable().default(null),
        delivered: z.boolean().default(false)
    });

    export type Type = z.infer<typeof Schema>;

    export namespace Frontend {
        export namespace Form {
            export const Schema = Order.Schema.omit({ id: true }).extend({
                items: Items.Frontend.Schema
            });

            export type Type = z.infer<typeof Schema>;
        }

        export namespace Write {
            export const Schema = Order.Schema.omit({ id: true }).extend({
                items: Items.Schema
            });

            export type Type = z.infer<typeof Schema>;
        }
    }
}
