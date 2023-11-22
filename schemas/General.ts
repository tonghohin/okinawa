import { z } from "zod";

export namespace General {
    export namespace Regions {
        export const Enum = z.enum(["香港島", "九龍", "新界"]);

        export type Type = z.infer<typeof Enum>;
    }

    export namespace Address {
        export const Schema = z.object({
            region: Regions.Enum.default("香港島"),
            district: z.string().trim().toUpperCase().default(""),
            street: z.string().trim().toUpperCase().nullable().default(""),
            building: z.string().trim().toUpperCase().nullable().default(""),
            floor: z.string().trim().toUpperCase().nullable().default(""),
            flat: z.string().trim().toUpperCase().nullable().default("")
        });

        export type Type = z.infer<typeof Schema>;

        export const State = Schema.parse({});
    }
}
