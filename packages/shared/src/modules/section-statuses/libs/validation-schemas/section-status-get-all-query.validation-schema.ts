import { z } from "zod";

const sectionStatusGetAllQuery = z
	.object({
		courseId: z.coerce.number(),
		userId: z.coerce.number(),
	})
	.required();

export { sectionStatusGetAllQuery };
