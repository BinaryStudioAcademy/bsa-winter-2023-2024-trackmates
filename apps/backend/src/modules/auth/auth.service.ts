import { token as tokenModule } from "~/libs/modules/token/token.js";

import {
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

class AuthService {
	private userService: UserService;

	public constructor(userService: UserService) {
		this.userService = userService;
	}

	public async signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const user = await this.userService.create(userRequestDto);

		// TODO: rewrite setting expiration
		const date = new Date();
		const days = 1;
		date.setDate(date.getDate() + days);

		const token = await tokenModule.createToken({ userId: user.id }, date);

		return {
			...user,
			token,
		};
	}
}

export { AuthService };
