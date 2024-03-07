import { z } from "zod";

const activityCreateFinishSection = z
	.object({
		sectionStatusId: z.number().int(),
	})
	.required();

export { activityCreateFinishSection };
