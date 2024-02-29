import { z } from "zod";

import { SectionStatus } from "../enums/enums.js";

const sectionStatusCreateBody = z
	.object({
		courseSectionId: z.coerce.number(),
		status: z.enum([SectionStatus.COMPLETED, SectionStatus.IN_PROGRESS]),
		userId: z.coerce.number(),
	})
	.required();

export { sectionStatusCreateBody };
