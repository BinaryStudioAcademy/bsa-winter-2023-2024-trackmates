import { config } from "~/libs/modules/config/config.js";

import { BaseToken } from "./base-token.module.js";
import {
	type ResetPasswordTokenPayload,
	type TokenPayload,
} from "./libs/types/types.js";

const token = new BaseToken<TokenPayload>({
	algorithm: config.ENV.JWT.ALGORITHM,
	expiresIn: config.ENV.JWT.EXPIRES_IN,
	secret: Buffer.from(config.ENV.JWT.SECRET, "utf8"),
});

const resetPasswordToken = new BaseToken<ResetPasswordTokenPayload>({
	algorithm: config.ENV.RESET_PASSWORD.JWT.ALGORITHM,
	expiresIn: config.ENV.RESET_PASSWORD.JWT.EXPIRES_IN,
	secret: Buffer.from(config.ENV.RESET_PASSWORD.JWT.SECRET, "utf8"),
});

export { resetPasswordToken, token };
export {
	type ResetPasswordTokenPayload,
	type Token,
	type TokenPayload,
} from "./libs/types/types.js";
