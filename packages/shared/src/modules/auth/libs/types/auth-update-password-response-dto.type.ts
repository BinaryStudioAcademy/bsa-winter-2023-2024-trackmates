import { type UserAuthResponseDto } from "../../../users/users.js";

type AuthUpdatePasswordResponseDto = {
	token: string;
	user: UserAuthResponseDto;
};

export { type AuthUpdatePasswordResponseDto };
