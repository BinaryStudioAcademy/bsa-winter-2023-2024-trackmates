import { type ValueOf } from "../../../../libs/types/types.js";
import { type ActivityType } from "../enums/enums.js";
import { type ActivityResponseDto } from "./activity-response-dto.type.js";

type ActivityGetAllResponseDto = {
	items: ActivityResponseDto<ValueOf<typeof ActivityType>>[];
};

export { type ActivityGetAllResponseDto };
