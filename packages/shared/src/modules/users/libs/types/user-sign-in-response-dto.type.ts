import { User } from "./user.type.js";

type UserSignInResponseDto = {
	user: User;
	token: string;
};

export { type UserSignInResponseDto };
