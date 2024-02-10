import {
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";
import { type AuthService as AuthServiceT } from "./libs/types/types.js";
import {
	AuthError,
	HTTPCode,
	type UserWithPassword,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
} from "shared";
import { cryptCompare } from "./helpers/crypt/crypt-compare.helper.js";
import { ExceptionMessage } from "~/libs/enums/enums.js";

function createTokenStub({ id }: { id: number }) {
	return `token for user with id=${id}`;
}

class AuthService implements AuthServiceT {
	private userService: UserService;

	public constructor(userService: UserService) {
		this.userService = userService;
	}

	public signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		return this.userService.create(userRequestDto);
	}

	public async signIn(
		userRequestDto: UserSignInRequestDto,
	): Promise<UserSignInResponseDto> {
		const user = await this.verifyLoginCredentials(userRequestDto);

		const { id, email } = user;

		return {
			user: { id, email },
			token: createTokenStub({ id }),
		};
	}

	private async verifyLoginCredentials({
		email,
		password,
	}: UserSignInRequestDto): Promise<UserWithPassword> | never {
		const user = await this.userService.getByEmail(email);

		if (user === null) {
			throw new AuthError({
				message: ExceptionMessage.INCORRECT_EMAIL,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const isEqualPassword = await cryptCompare(password, user.passwordHash);

		if (!isEqualPassword) {
			throw new AuthError({
				message: ExceptionMessage.PASSWORDS_NOT_MATCH,
			});
		}

		return user;
	}
}

export { AuthService };
