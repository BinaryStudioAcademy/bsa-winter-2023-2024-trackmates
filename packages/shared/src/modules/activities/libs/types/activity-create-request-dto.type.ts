import { type ValueOf } from "../../../../libs/types/types.js";
import { type ActivityTypeValue } from "../enums/enums.js";
import { type ActivityPayloadMap } from "./activity-payload-map.type.js";

type ActivityCreateRequestDto<T extends ValueOf<typeof ActivityTypeValue>> = {
	actionId: number;
	payload: ActivityPayloadMap[T];
};

export { type ActivityCreateRequestDto };
