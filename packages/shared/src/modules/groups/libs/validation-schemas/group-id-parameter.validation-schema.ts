import { z } from "zod";

import { GroupValidationRule } from "../enums/enums.js";

const groupIdParameter = z
	.object({
		groupId: z.coerce.number().min(GroupValidationRule.GROUP_ID_MINIMUM_VALUE),
	})
	.required();

export { groupIdParameter };
