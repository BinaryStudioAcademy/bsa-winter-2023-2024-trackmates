import { z } from "zod";

const actionIdParameter = z
	.object({
		actionId: z.coerce.number(),
	})
	.required();

export { actionIdParameter };
