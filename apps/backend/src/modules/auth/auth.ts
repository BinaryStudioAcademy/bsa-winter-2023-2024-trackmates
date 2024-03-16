import { config } from "~/libs/modules/config/config.js";
import { encrypt } from "~/libs/modules/encrypt/encrypt.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { mail } from "~/libs/modules/mail/mail.js";
import { token, updatePasswordToken } from "~/libs/modules/token/token.js";
import { userService } from "~/modules/users/users.js";

import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

const authService = new AuthService({
	encrypt,
	mail,
	token,
	updatePasswordBaseLink: config.ENV.UPDATE_PASSWORD.BASE_LINK,
	updatePasswordToken,
	userService,
});
const authController = new AuthController(logger, authService);

export { authController };
export { AuthApiPath } from "./libs/enums/enums.js";
export { AuthError } from "./libs/exceptions/exceptions.js";
