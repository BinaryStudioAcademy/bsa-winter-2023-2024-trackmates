import { z } from "zod";

import {
	GroupValidationErrorMessage,
	GroupValidationRule,
} from "../enums/enums.js";

const groupIdAndPermissionIdParameters = z
	.object({
		groupId: z.coerce.number().min(GroupValidationRule.ID_MINIMUM_VALUE, {
			message: GroupValidationErrorMessage.INVALID_ID,
		}),
		permissionId: z.coerce.number().min(GroupValidationRule.ID_MINIMUM_VALUE, {
			message: GroupValidationErrorMessage.INVALID_ID,
		}),
	})
	.required();

export { groupIdAndPermissionIdParameters };
