import { z } from "zod";

const userIdParameter = z
	.object({
		userId: z.coerce.number(),
	})
	.required();

export { userIdParameter };
