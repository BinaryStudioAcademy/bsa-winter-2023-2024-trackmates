import { z } from "zod";

const sectionStatusesGetAllQuery = z
	.object({
		courseId: z.coerce.number(),
		userId: z.coerce.number(),
	})
	.required();

export { sectionStatusesGetAllQuery };
