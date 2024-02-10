import { User } from "./user.type.js";

type UserSignInResponseDto = {
	user: User; // або може краще UserAuthResponse як в threads-js?
	token: string;
};

export { type UserSignInResponseDto };
