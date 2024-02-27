import { z } from "zod";

const addCourse = z
	.object({
		vendorCourseId: z.string(),
		vendorId: z.number().int(),
	})
	.required();

export { addCourse };
