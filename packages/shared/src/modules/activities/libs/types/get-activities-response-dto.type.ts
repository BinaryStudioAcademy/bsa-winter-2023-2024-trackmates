import { type ActivityDto } from "./activity-dto.type.js";
import { type ActivityType } from "./activity-type.type.js";

type GetActivitiesResponseDto = {
	activities: ActivityDto<ActivityType>[];
};

export { type GetActivitiesResponseDto };
