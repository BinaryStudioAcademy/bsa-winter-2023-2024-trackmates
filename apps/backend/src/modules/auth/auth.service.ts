import { ExceptionMessage } from "~/libs/enums/enums.js";
import { Encrypt } from "~/libs/modules/encrypt/encrypt.js";
import {
	type BaseToken,
	token as tokenModule,
} from "~/libs/modules/token/token.js";
import {
	UserEntity,
	type UserService,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/users.js";

import { AuthError } from "./libs/exceptions/exceptions.js";

type Constructor = {
	encrypt: Encrypt;
	token: BaseToken;
	userService: UserService;
};

class AuthService {
	private encrypt: Encrypt;
	private token: BaseToken;
	private userService: UserService;

	public constructor({ encrypt, token, userService }: Constructor) {
		this.encrypt = encrypt;
		this.token = token;
		this.userService = userService;
	}

	private async verifyLoginCredentials({
		email,
		password,
	}: UserSignInRequestDto): Promise<UserEntity> | never {
		const user = await this.userService.getByEmail(email);

		if (!user) {
			throw new AuthError(ExceptionMessage.INCORRECT_CREDENTIALS);
		}

		const { passwordHash, passwordSalt: salt } = user.toNewObject();
		const isEqualPassword = await this.encrypt.compare({
			password,
			passwordHash,
			salt,
		});

		if (!isEqualPassword) {
			throw new AuthError(ExceptionMessage.INCORRECT_CREDENTIALS);
		}

		return user;
	}

	public async signIn(
		userRequestDto: UserSignInRequestDto,
	): Promise<UserSignInResponseDto> {
		const user = await this.verifyLoginCredentials(userRequestDto);

		const { id } = user.toObject();

		return {
			token: await this.token.create({ userId: id }),
			user: user.toObject(),
		};
	}

	public async signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const user = await this.userService.create(userRequestDto);

		const token = await tokenModule.create({ userId: user.id });

		return {
			token,
			user,
		};
	}
}

export { AuthService };
