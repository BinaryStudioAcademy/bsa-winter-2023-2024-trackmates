import { type ValueOf } from "../../../libs/types/types.js";
import { type NotificationFilter } from "../enums/enums.js";

type NotificationTypeFilterRequestDto = {
	type: ValueOf<typeof NotificationFilter>;
};

export { type NotificationTypeFilterRequestDto };
