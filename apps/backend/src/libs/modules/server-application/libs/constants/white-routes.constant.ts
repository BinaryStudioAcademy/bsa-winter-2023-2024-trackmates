import { APIPath } from "~/libs/enums/enums.js";
import { AuthApiPath } from "~/modules/auth/auth.js";

const WHITE_ROUTES = [
	`${APIPath.AUTH}${AuthApiPath.SIGN_UP}`,
	`${APIPath.AUTH}${AuthApiPath.SIGN_IN}`,
	`${APIPath.AUTH}${AuthApiPath.SEND_UPDATE_PASSWORD_LINK}`,
	`${APIPath.AUTH}${AuthApiPath.UPDATE_PASSWORD}`,
];

export { WHITE_ROUTES };
