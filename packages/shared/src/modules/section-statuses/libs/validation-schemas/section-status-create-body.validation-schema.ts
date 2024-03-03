import { z } from "zod";

import { getZodEnum } from "../../../../libs/helpers/helpers.js";
import { SectionStatus } from "../enums/enums.js";

const sectionStatusCreateBody = z
	.object({
		courseSectionId: z.number(),
		status: z.enum(getZodEnum(Object.values(SectionStatus))),
	})
	.required();

export { sectionStatusCreateBody };
