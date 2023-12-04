import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";


export const Flash = z.object({
  name: z.string(),
  imgUrl: z.string(),
  description: z.string(),
  size: z.string(),
  price: z.string(),
  isRepeatable: z.boolean(),
  isAvailable: z.boolean(),
});

export type Flash = z.infer<typeof Flash>;
