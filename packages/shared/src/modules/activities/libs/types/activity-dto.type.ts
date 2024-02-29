import { type UserAuthResponseDto } from "../../../../modules/users/users.js";
import { type ActivityActionMap } from "./activity-action-map.type.js";
import { type ActivityType } from "./activity-type.type.js";

type ActivityDto<TYPE extends ActivityType> = {
	action: ActivityActionMap[TYPE];
	id: string;
	time: string;
	type: TYPE;
	user: UserAuthResponseDto;
};

export { type ActivityDto };
