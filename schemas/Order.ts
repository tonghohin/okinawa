import { z } from "zod";
import { General } from "./General";
import { Menu } from "./Menu";

export namespace Order {
    export namespace RiceItem {
        export const Schema = z.object({
            id: z.string().readonly(),
            quantity: z.coerce.number().finite().safe().int().min(0).default(0),
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

            export const State = (item: Menu.Rice.Item.Type) => Schema.parse({ item });
        }
    }

    export namespace NoodlesItem {
        export const Schema = z.object({
            id: z.string().readonly(),
            quantity: z.coerce.number().finite().safe().int().min(0).default(0),
            addOns: z.array(z.string()).default([])
        });

        export type Type = z.infer<typeof Schema>;

        export namespace Frontend {
            export const Schema = NoodlesItem.Schema.omit({ id: true }).extend({
                item: Menu.Noodles.Item.Schema,
                addOns: z.array(Menu.Noodles.Item.Schema).default([])
            });

            export type Type = z.infer<typeof Schema>;

            export const State = (item: Menu.Noodles.Item.Type) => Schema.parse({ item });
        }
    }

    export namespace SnacksItem {
        export const Schema = z.object({
            id: z.string().readonly(),
            quantity: z.coerce.number().finite().safe().int().min(0).default(0)
        });

        export type Type = z.infer<typeof Schema>;
        export namespace Frontend {
            export const Schema = SnacksItem.Schema.omit({ id: true }).extend({
                item: Menu.Snacks.Item.Schema
            });

            export type Type = z.infer<typeof Schema>;

            export const State = (item: Menu.Snacks.Item.Type) => Schema.parse({ item });
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

            export const State = Schema.parse({});
        }
    }

    export const Schema = z.object({
        id: z.string().readonly(),
        name: z.string().trim().min(1, { message: "未寫名" }).default(""),
        email: z.string().trim().email({ message: "Email format唔啱" }).toLowerCase().default(""),
        phone: z
            .string()
            .trim()
            .regex(/^\d{8}$/, { message: "電話號碼要8個字" })
            .length(8, { message: "電話號碼要8個字" })
            .default(""),
        items: Items.Schema,
        total: z.coerce.number().finite().safe().min(1).default(0),
        delivery: z.boolean().default(false),
        address: General.Address.Schema.nullable().default(null),
        date: z.coerce.date().default(new Date()),
        comments: z.string().trim().nullable().default(null),
        delivered: z.boolean().default(false)
    });

    export type Type = z.infer<typeof Schema>;

    export namespace Partial {
        export const Schema = Order.Schema.partial();

        export type Type = z.infer<typeof Schema>;
    }

    export namespace Frontend {
        export namespace Form {
            export const Schema = Order.Schema.extend({
                id: z.string().readonly().optional(),
                name: z.string().trim().default(""),
                email: z.string().trim().toLowerCase().default(""),
                items: Items.Frontend.Schema.default(Items.Frontend.State),
                phone: z.string().trim().default(""),
                total: z.coerce.number().finite().safe().min(0).default(0)
            });

            export type Type = z.infer<typeof Schema>;

            export const State = Schema.parse({});
        }

        export namespace Write {
            export const Schema = Order.Schema.extend({
                id: z.string().readonly().optional(),
                items: Items.Schema
            });

            export type Type = z.infer<typeof Schema>;
        }
    }
}
