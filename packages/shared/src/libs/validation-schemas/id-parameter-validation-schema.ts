import { z } from "zod";

const idParameter = z
	.object({
		id: z.coerce.number(),
	})
	.required();

export { idParameter };
