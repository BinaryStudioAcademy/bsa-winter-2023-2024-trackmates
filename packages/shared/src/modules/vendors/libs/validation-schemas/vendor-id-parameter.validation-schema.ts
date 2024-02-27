import { z } from "zod";

const vendorIdParameter = z
	.object({
		vendorId: z.coerce.number(),
	})
	.required();

export { vendorIdParameter };
