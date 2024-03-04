import { z } from "zod";

const activityActionIdParameter = z
	.object({
		actionId: z.coerce.number(),
	})
	.required();

export { activityActionIdParameter };
