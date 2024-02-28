import { z } from "zod";

const sectionStatusesGetAllQuery = z
	.object({
		courseSectionId: z.coerce.number(),
		userId: z.coerce.number(),
	})
	.required();

export { sectionStatusesGetAllQuery };
