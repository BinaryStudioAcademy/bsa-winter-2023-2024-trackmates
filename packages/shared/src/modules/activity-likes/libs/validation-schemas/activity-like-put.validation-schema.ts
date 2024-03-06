import { z } from "zod";

const activityLikePut = z.object({ activityId: z.number().int() }).required();

export { activityLikePut };
