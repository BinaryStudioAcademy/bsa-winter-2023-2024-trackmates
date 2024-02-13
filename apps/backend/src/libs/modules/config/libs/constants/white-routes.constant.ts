import { APIPath } from "~/libs/enums/enums.js";
import { AuthApiPath } from "~/modules/auth/auth.js";

const WHITE_ROUTES = [
	`${APIPath.AUTH}${AuthApiPath.SIGN_UP}`,
	`${APIPath.AUTH}${AuthApiPath.SIGN_IN}`,
];

export { WHITE_ROUTES };
