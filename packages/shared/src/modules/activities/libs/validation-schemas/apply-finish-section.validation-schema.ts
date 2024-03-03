import { z } from "zod";

import { ActivityTypeValue } from "../enums/enums.js";

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
		type: z
			.string()
			.refine((type) => type === ActivityTypeValue.FINISH_SECTION),
	})
	.required();

export { applyFinishSection };
