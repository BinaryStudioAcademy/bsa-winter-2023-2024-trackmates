import {
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

import { ErrorMessage } from "./libs/enums/enums.js";
import { AuthError } from "./libs/exceptions/exceptions.js";

class AuthService {
	private userService: UserService;

	public constructor(userService: UserService) {
		this.userService = userService;
	}

	public async signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const userWithSuchEmail = await this.userService.getByEmail(
			userRequestDto.email,
		);
		const isUserWithSuchEmailExist = Boolean(userWithSuchEmail);
		if (isUserWithSuchEmailExist) {
			throw new AuthError(ErrorMessage.EMAIL_ALREADY_EXISTS);
		}
		return await this.userService.create(userRequestDto);
	}
}

export { AuthService };
