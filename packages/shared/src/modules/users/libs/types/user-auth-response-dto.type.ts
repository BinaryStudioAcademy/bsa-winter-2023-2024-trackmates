import { type ValueOf } from "../../../../libs/types/types.js";
import { type GroupResponseDto } from "../../../groups/groups.js";
import { type UserSex } from "../enums/enums.js";

type UserAuthResponseDto = {
	avatarUrl: null | string;
	createdAt: string;
	email: string;
	firstName: string;
	groups: GroupResponseDto[];
	id: number;
	lastName: string;
	nickname: null | string;
	sex: ValueOf<typeof UserSex> | null;
	updatedAt: string;
};

export { type UserAuthResponseDto };
