import { type ActivityResponseDto } from "./activity-response-dto.type.js";
import { type ActivityType } from "./activity-type.type.js";

type ActivityGetActivitiesResponseDto = {
	items: ActivityResponseDto<ActivityType>[];
};

export { type ActivityGetActivitiesResponseDto };
