import { config } from "~/libs/modules/config/config.js";

import { BaseToken } from "./base-token.module.js";
import {
	type TokenPayload,
	type UpdatePasswordTokenPayload,
} from "./libs/types/types.js";

const token = new BaseToken<TokenPayload>({
	algorithm: config.ENV.JWT.ALGORITHM,
	expiresIn: config.ENV.JWT.EXPIRES_IN,
	secret: Buffer.from(config.ENV.JWT.SECRET, "utf8"),
});

const updatePasswordToken = new BaseToken<UpdatePasswordTokenPayload>({
	algorithm: config.ENV.UPDATE_PASSWORD.JWT.ALGORITHM,
	expiresIn: config.ENV.UPDATE_PASSWORD.JWT.EXPIRES_IN,
	secret: Buffer.from(config.ENV.UPDATE_PASSWORD.JWT.SECRET, "utf8"),
});

export { token, updatePasswordToken };
export {
	type Token,
	type TokenPayload,
	type UpdatePasswordTokenPayload,
} from "./libs/types/types.js";
