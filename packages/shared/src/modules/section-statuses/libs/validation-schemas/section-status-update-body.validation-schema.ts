import { z } from "zod";

import { SectionStatus } from "../enums/enums.js";

const sectionStatusUpdateBody = z
	.object({
		status: z.enum([SectionStatus.COMPLETED, SectionStatus.IN_PROGRESS]),
	})
	.required();

export { sectionStatusUpdateBody };
