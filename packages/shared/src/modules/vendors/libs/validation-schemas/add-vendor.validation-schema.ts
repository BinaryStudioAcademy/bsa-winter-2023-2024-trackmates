import { z } from "zod";

const addVendor = z
	.object({
		key: z.string(),
		name: z.string(),
		url: z.string(),
	})
	.required();

export { addVendor };
