import { z } from "zod";

import { SectionStatus } from "../enums/enums.js";

const sectionStatusCreateBody = z
	.object({
		courseSectionId: z.number(),
		status: z.enum([SectionStatus.COMPLETED, SectionStatus.IN_PROGRESS]),
		userId: z.number(),
	})
	.required();

export { sectionStatusCreateBody };
