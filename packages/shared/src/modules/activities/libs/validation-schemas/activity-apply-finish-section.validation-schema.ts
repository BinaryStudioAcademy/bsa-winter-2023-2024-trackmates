import { z } from "zod";

const activityApplyFinishSection = z
	.object({
		actionId: z.number().int(),
		payload: z
			.object({
				course: z.object({
					id: z.number().int(),
					title: z.string(),
					vendorId: z.number().int(),
				}),
				id: z.number().int(),
				title: z.string(),
			})
			.required(),
	})
	.required();

export { activityApplyFinishSection };
