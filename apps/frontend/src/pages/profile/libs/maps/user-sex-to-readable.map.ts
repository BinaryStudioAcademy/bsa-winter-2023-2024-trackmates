import { type ValueOf } from "~/libs/types/types.js";
import { UserSex } from "~/modules/users/users.js";

const userSexToReadable: Record<ValueOf<typeof UserSex>, string> = {
	[UserSex.FEMALE]: "Female",
	[UserSex.MALE]: "Male",
	[UserSex.PREFER_NOT_TO_SAY]: "Prefer not to say",
};

export { userSexToReadable };
