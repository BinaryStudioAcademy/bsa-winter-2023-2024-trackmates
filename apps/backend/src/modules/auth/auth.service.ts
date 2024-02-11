import { ExceptionMessage } from "~/libs/enums/enums.js";
import { AuthError } from "~/libs/exceptions/exceptions.js";
import {
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";
import {
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserWithPassword,
} from "~/modules/users/users.js";

import { cryptCompare } from "./helpers/crypt/crypt-compare.helper.js";

function createTokenStub({ id }: { id: number }) {
	return `token for user with id=${id}`;
}

class AuthService {
	private userService: UserService;

	public constructor(userService: UserService) {
		this.userService = userService;
	}

	private async verifyLoginCredentials({
		email,
		password,
	}: UserSignInRequestDto): Promise<UserWithPassword> | never {
		const user = await this.userService.getByEmail(email);

		if (user === null) {
			throw new AuthError({
				message: ExceptionMessage.INCORRECT_CREDENTIALS,
			});
		}

		const isEqualPassword = await cryptCompare(password, user.passwordHash);

		if (!isEqualPassword) {
			throw new AuthError({
				message: ExceptionMessage.INCORRECT_CREDENTIALS,
			});
		}

		return user;
	}

	public async signIn(
		userRequestDto: UserSignInRequestDto,
	): Promise<UserSignInResponseDto> {
		const user = await this.verifyLoginCredentials(userRequestDto);

		const { email, id } = user;

		return {
			token: createTokenStub({ id }),
			user: { email, id },
		};
	}

	public signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		return this.userService.create(userRequestDto);
	}
}

export { AuthService };
