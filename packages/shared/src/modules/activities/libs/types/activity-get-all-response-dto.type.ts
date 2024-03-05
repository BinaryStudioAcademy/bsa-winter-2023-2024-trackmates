import { type ValueOf } from "../../../../libs/types/types.js";
import { type ActivityTypeValue } from "../enums/enums.js";
import { type ActivityResponseDto } from "./activity-response-dto.type.js";

type ActivityGetAllResponseDto = {
	items: ActivityResponseDto<ValueOf<typeof ActivityTypeValue>>[];
};

export { type ActivityGetAllResponseDto };
