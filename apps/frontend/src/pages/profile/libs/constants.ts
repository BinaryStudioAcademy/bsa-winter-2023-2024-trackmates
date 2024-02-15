import { type UserProfileRequestDto } from "~/modules/users/users.js";

const DEFAULT_PROFILE_PAYLOAD: UserProfileRequestDto = {
	country: "",
	fullName: "",
	location: "",
	timeZone: "",
};

export { DEFAULT_PROFILE_PAYLOAD };
