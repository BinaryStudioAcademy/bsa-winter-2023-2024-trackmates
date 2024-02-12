import { encrypt } from "~/libs/modules/encrypt/encrypt.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { tokenizer } from "~/libs/modules/tokenizer/tokenizer.js";
import { userService } from "~/modules/users/users.js";

import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

const authService = new AuthService({ encrypt, tokenizer, userService });
const authController = new AuthController(logger, authService);

export { authController };
