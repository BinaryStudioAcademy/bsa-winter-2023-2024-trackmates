import { z } from "zod";

const courseIdParameter = z
	.object({
		courseId: z.coerce.number(),
	})
	.required();

export { courseIdParameter };
