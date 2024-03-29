import { encrypt } from "~/libs/modules/encrypt/encrypt.js";
import { logger } from "~/libs/modules/logger/logger.js";

import { UserController } from "./user.controller.js";
import { UserModel } from "./user.model.js";
import { UserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";
import { UserDetailsModel } from "./user-details.model.js";

const userRepository = new UserRepository(UserModel, UserDetailsModel);
const userService = new UserService(encrypt, userRepository);
const userController = new UserController(logger, userService);

export { userController, userRepository, userService };
export { UserSex } from "./libs/enums/enums.js";
export { UserError } from "./libs/exceptions/exceptions.js";
export {
	type UserAuthResponseDto,
	type UserDetailsResponseDto,
	type UserProfileRequestDto,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "./libs/types/types.js";
export {
	userProfileValidationSchema,
	userSignInValidationSchema,
	userSignUpValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
export { UserEntity } from "./user.entity.js";
export { UserModel } from "./user.model.js";
export { type UserRepository } from "./user.repository.js";
export { type UserService } from "./user.service.js";
export { UserDetailsModel } from "./user-details.model.js";
