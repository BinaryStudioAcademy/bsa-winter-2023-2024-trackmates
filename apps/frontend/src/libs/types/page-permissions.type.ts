import { type PermissionKey, type PermissionMode } from "~/libs/enums/enums.js";

import { type ValueOf } from "./value-of.type.js";

type PagePermissions = {
	mode: ValueOf<typeof PermissionMode>;
	permissions: ValueOf<typeof PermissionKey>[];
};

export { type PagePermissions };
