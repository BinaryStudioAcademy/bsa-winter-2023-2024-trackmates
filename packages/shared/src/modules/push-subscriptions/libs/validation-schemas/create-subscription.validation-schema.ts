import { z } from "zod";

const createSubscription = z
	.object({
		endpoint: z.string(),
		expirationTime: z.coerce.number(),
		keys: z.object({
			auth: z.string(),
			p256dh: z.string(),
		}),
	})
	.required();

export { createSubscription };
