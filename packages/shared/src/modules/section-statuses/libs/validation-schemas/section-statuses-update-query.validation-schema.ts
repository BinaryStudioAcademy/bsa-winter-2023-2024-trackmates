import { z } from "zod";

const sectionStatusesUpdateQuery = z
	.object({
		id: z.coerce.number(),
	})
	.required();

export { sectionStatusesUpdateQuery };
