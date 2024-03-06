import { z } from "zod";

import { PermissionValidationRule } from "../enums/enums.js";

const permissionIdParameter = z
	.object({
		permissionId: z.coerce.number().min(PermissionValidationRule.PERMISSION_ID_MINIMUM_VALUE),
	})
	.required();

export { permissionIdParameter };
