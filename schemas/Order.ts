import { z } from "zod";
import { General } from "./General";
import { Menu } from "./Menu";

export namespace Order {
    export namespace RiceItem {
        export namespace Frontend {
            export const Schema = z.object({
                item: Menu.Rice.Item.Schema,
                quantity: z.number(),
                toUdon: z.boolean(),
                addOn: z.optional(Menu.Rice.Item.Schema)
            });

            export type Type = z.infer<typeof Schema>;
        }

        export namespace Backend {
            export const Schema = z.object({
                id: z.string(),
                quantity: z.number(),
                toUdon: z.boolean(),
                addOn: z.optional(z.string())
            });

            export type Type = z.infer<typeof Schema>;
        }
    }

    export namespace NoodlesItem {
        export namespace Frontend {
            export const Schema = z.object({
                item: Menu.Noodles.Item.Schema,
                quantity: z.number(),
                addOns: z.array(Menu.Noodles.Item.Schema)
            });

            export type Type = z.infer<typeof Schema>;
        }

        export namespace Backend {
            export const Schema = z.object({
                id: z.string(),
                quantity: z.number(),
                addOns: z.array(z.string())
            });

            export type Type = z.infer<typeof Schema>;
        }
    }

    export namespace SnacksItem {
        export namespace Frontend {
            export const Schema = z.object({
                item: Menu.Snacks.Item.Schema,
                quantity: z.number()
            });

            export type Type = z.infer<typeof Schema>;
        }

        export namespace Backend {
            export const Schema = z.object({
                id: z.string(),
                quantity: z.number()
            });

            export type Type = z.infer<typeof Schema>;
        }
    }

    export namespace Items {
        export namespace Frontend {
            export const Schema = z.object({
                rice: z.array(RiceItem.Frontend.Schema),
                noodles: z.array(NoodlesItem.Frontend.Schema),
                snacks: z.array(SnacksItem.Frontend.Schema)
            });

            export type Type = z.infer<typeof Schema>;
        }

        export namespace Backend {
            export const Schema = z.object({
                rice: z.array(RiceItem.Backend.Schema),
                noodles: z.array(NoodlesItem.Backend.Schema),
                snacks: z.array(SnacksItem.Backend.Schema)
            });

            export type Type = z.infer<typeof Schema>;
        }
    }

    export namespace Frontend {
        export const Schema = z.object({
            name: z.string(),
            email: z.string().email(),
            phone: z.string(),
            items: Items.Frontend.Schema,
            total: z.number(),
            delivery: z.boolean(),
            address: General.Address.Schema,
            date: z.date(),
            comments: z.string(),
            delivered: z.boolean()
        });

        export type Type = z.infer<typeof Schema>;
    }

    export namespace Backend {
        export namespace Write {
            export const Schema = z.object({
                name: z.string(),
                email: z.string().email(),
                phone: z.string(),
                items: Items.Backend.Schema,
                total: z.number(),
                delivery: z.boolean(),
                address: z.optional(General.Address.Schema),
                date: z.date(),
                comments: z.string(),
                delivered: z.boolean()
            });

            export type Type = z.infer<typeof Schema>;
        }

        export namespace Read {
            export const Schema = z.object({
                id: z.string(),
                name: z.string(),
                email: z.string().email(),
                phone: z.string(),
                items: Items.Backend.Schema,
                total: z.number(),
                delivery: z.boolean(),
                address: z.optional(General.Address.Schema),
                date: z.date(),
                comments: z.string(),
                delivered: z.boolean()
            });

            export type Type = z.infer<typeof Schema>;
        }
    }
}
