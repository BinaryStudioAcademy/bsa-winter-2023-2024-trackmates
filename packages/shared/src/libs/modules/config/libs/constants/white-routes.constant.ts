import { AuthApiPath } from "../../../../../modules/auth/libs/enums/auth-api-path.enum.js";
import { APIPath } from "../../../../enums/api-path.enum.js";

const WHITE_ROUTES = [
	`${APIPath.AUTH}${AuthApiPath.SIGN_UP}`,
	`${APIPath.AUTH}${AuthApiPath.SIGN_IN}`,
];

export { WHITE_ROUTES };
