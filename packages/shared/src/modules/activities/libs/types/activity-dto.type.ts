import { type UserAuthResponseDto } from "../../../../modules/users/users.js";
import { type ActivityPayloadMap } from "./activity-payload-map.type.js";
import { type ActivityType } from "./activity-type.type.js";

type ActivityDto<TYPE extends ActivityType> = {
	id: number;
	payload: ActivityPayloadMap[TYPE];
	type: TYPE;
	updatedAt: string;
	user: UserAuthResponseDto;
};

export { type ActivityDto };
