import { z } from "zod";

import { getZodEnum } from "../../../../libs/helpers/helpers.js";
import { SectionStatus } from "../enums/enums.js";

const sectionStatusUpdateBody = z
	.object({
		status: z.enum(getZodEnum(Object.values(SectionStatus))),
	})
	.required();

export { sectionStatusUpdateBody };
