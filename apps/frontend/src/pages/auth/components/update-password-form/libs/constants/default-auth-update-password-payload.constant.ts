import { type AuthUpdatePasswordRequestDto } from "~/modules/auth/auth.js";

const DEFAULT_AUTH_UPDATE_PASSWORD_IN_PAYLOAD: Omit<
	AuthUpdatePasswordRequestDto,
	"token"
> = {
	password: "",
};

export { DEFAULT_AUTH_UPDATE_PASSWORD_IN_PAYLOAD };
