import { type ValueOf } from "~/libs/types/types.js";

import { NotificationType } from "../enums/enums.js";

type NotificationService = {
	[K in ValueOf<typeof NotificationType>]: (message?: string) => void;
};

export { type NotificationService };
