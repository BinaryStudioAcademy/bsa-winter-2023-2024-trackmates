import { type AuthSendUpdatePasswordLinkRequestDto } from "~/modules/auth/auth.js";

const DEFAULT_FORGOT_PASSWORD_IN_PAYLOAD: AuthSendUpdatePasswordLinkRequestDto =
	{
		email: "",
	};

export { DEFAULT_FORGOT_PASSWORD_IN_PAYLOAD };
