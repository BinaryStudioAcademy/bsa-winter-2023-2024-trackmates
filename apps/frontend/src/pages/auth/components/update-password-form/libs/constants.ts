import { type AuthUpdatePasswordRequestDto } from "~/modules/auth/auth.js";

const DEFAULT_UPDATE_PASSWORD_IN_PAYLOAD: AuthUpdatePasswordRequestDto = {
	password: "",
	token: "",
};

export { DEFAULT_UPDATE_PASSWORD_IN_PAYLOAD };
