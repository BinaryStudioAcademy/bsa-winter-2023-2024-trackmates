import { type UserProfileRequestDto } from "~/modules/users/users.js";

const DEFAULT_PROFILE_PAYLOAD: UserProfileRequestDto = {
	country: "",
	fullName: "",
	id: 0,
	location: "",
	timeZone: "",
};

export { DEFAULT_PROFILE_PAYLOAD };
