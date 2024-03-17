import { type ValueOf } from "../../../../libs/types/types.js";
import { type UserAuthResponseDto } from "../../../users/users.js";
import { type ActivityType } from "../enums/enums.js";
import { type ActivityPayloadMap } from "./activity-payload-map.type.js";

type ActivityResponseDto<T extends ValueOf<typeof ActivityType>> = {
	commentCount: number;
	id: number;
	isLikedByUser: boolean | null;
	likesCount: number;
	payload: ActivityPayloadMap[T];
	type: T;
	updatedAt: string;
	user: UserAuthResponseDto;
};

export { type ActivityResponseDto };
