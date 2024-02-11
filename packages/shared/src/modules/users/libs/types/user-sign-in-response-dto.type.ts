import { User } from "./user.type.js";

type UserSignInResponseDto = {
	token: string;
	user: User;
};

export { type UserSignInResponseDto };
