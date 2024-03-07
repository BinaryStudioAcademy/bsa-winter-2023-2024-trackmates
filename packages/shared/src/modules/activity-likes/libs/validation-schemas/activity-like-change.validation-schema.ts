import { z } from "zod";

const activityLikeChange = z
	.object({ activityId: z.number().int() })
	.required();

export { activityLikeChange };
