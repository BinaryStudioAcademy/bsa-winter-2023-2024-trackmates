import { z } from "zod";

const courseSectionGetAllQuery = z
	.object({
		courseId: z.coerce.number(),
		userId: z.coerce.number(),
	})
	.required();

export { courseSectionGetAllQuery };
