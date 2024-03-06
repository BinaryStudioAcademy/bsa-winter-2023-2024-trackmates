import { z } from "zod";

const sectionStatusUpdateQuery = z
	.object({
		id: z.coerce.number(),
	})
	.required();

export { sectionStatusUpdateQuery };
