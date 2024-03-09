import { z } from "zod";

const commentGetAllQuery = z
	.object({
		activityId: z.coerce.number().positive(),
	})
	.required();

export { commentGetAllQuery };
