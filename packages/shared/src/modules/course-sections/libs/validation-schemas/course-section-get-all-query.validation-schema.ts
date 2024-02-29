import { z } from "zod";

const courseSectionGetAllQuery = z
	.object({
		courseId: z.coerce.number(),
	})
	.required();

export { courseSectionGetAllQuery };
