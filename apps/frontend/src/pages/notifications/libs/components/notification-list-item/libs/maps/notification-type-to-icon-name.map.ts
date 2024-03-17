import { type Icon } from "~/libs/components/components.js";
import { NotificationType } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

const notificationTypeToIconName: Record<
	ValueOf<typeof NotificationType>,
	ValueOf<typeof Icon>
> = {
	[NotificationType.NEW_COMMENT]: "comment",
	[NotificationType.NEW_FOLLOWER]: "follower",
	[NotificationType.NEW_LIKE]: "like",
} as const;

export { notificationTypeToIconName };
