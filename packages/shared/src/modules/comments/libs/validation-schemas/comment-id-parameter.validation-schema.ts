import { z } from "zod";

const commentIdParameter = z
	.object({
		id: z.coerce.number().positive(),
	})
	.required();

export { commentIdParameter };
