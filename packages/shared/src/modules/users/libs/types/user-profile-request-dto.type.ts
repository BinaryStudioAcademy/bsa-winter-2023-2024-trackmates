import { type ValueOf } from "../../../../libs/types/types.js";
import { type UserSex } from "../enums/enums.js";

type UserProfileRequestDto = {
	firstName: string;
	lastName: string;
	nickname: null | string;
	sex: ValueOf<typeof UserSex> | null;
};

export { type UserProfileRequestDto };
