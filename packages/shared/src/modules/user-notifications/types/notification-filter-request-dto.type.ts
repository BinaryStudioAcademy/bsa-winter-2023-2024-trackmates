import { type ValueOf } from "../../../libs/types/types.js";
import { type NotificationFilter } from "../enums/enums.js";

type NotificationFilterRequestDto = {
	search: string;
	type: ValueOf<typeof NotificationFilter>;
};

export { type NotificationFilterRequestDto };
