import { z } from "zod";

export namespace General {
    export namespace Regions {
        export const Enum = z.enum(["香港島", "九龍", "新界"]);
        export type Type = z.infer<typeof Enum>;
    }

    export namespace Address {
        export const Schema = z.object({
            region: Regions.Enum,
            district: z.string(),
            street: z.string(),
            building: z.string(),
            floor: z.string(),
            flat: z.string()
        });

        export type Type = z.infer<typeof Schema>;
    }
}
