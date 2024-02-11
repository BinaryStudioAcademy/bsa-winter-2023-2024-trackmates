import { ExceptionMessage } from "~/libs/enums/enums.js";
import { Encript } from "~/libs/modules/encript/encript.js";
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

import { AuthError } from "./libs/exceptions/exceptions.js";

function createTokenStub({ id }: { id: number }) {
	return `token for user with id=${id}`;
}

class AuthService {
	private encript: Encript;
	private userService: UserService;

	public constructor(encript: Encript, userService: UserService) {
		this.encript = encript;
		this.userService = userService;
	}

	private async verifyLoginCredentials({
		email,
		password,
	}: UserSignInRequestDto): Promise<UserWithPassword> | never {
		const user = await this.userService.getByEmail(email);

		if (!user) {
			throw new AuthError(ExceptionMessage.INCORRECT_CREDENTIALS);
		}

		const isEqualPassword = await this.encript.compare(
			password,
			user.passwordHash,
			user.passwordSalt,
		);

		if (!isEqualPassword) {
			throw new AuthError(ExceptionMessage.INCORRECT_CREDENTIALS);
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
