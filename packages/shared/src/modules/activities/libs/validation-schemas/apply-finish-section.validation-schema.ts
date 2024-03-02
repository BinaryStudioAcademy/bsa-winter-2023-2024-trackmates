import { z } from "zod";

const applyFinishSection = z
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
		type: z.string().refine((type) => type === "FINISH_SECTION"),
	})
	.required();

export { applyFinishSection };
