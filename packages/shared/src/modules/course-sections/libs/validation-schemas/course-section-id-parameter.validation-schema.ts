import { z } from "zod";

const courseSectionIdParameter = z
	.object({
		courseSectionId: z.coerce.number(),
	})
	.required();

export { courseSectionIdParameter };
