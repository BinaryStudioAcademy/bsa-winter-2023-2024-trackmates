import { z } from "zod";

const activityDeleteFinishSection = z
	.object({
		userId: z.number().int(),
	})
	.required();

export { activityDeleteFinishSection };
