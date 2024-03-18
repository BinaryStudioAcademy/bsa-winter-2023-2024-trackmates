import { z } from "zod";

const cancelPaymentIntent = z
	.object({
		id: z.string().trim(),
	})
	.required();

export { cancelPaymentIntent };
