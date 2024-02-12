import { ExceptionMessage } from "~/libs/enums/enums.js";
import { Encrypt } from "~/libs/modules/encrypt/encrypt.js";
import { Tokenizer } from "~/libs/modules/tokenizer/tokenizer.js";
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

type Constructor = {
	encrypt: Encrypt;
	tokenizer: Tokenizer;
	userService: UserService;
};

class AuthService {
	private encrypt: Encrypt;
	private tokenizer: Tokenizer;
	private userService: UserService;

	public constructor({ encrypt, tokenizer, userService }: Constructor) {
		this.encrypt = encrypt;
		this.tokenizer = tokenizer;
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

		const { passwordHash, passwordSalt: salt } = user;
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

		const { email, id } = user;

		return {
			token: this.tokenizer.createToken({ id }),
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
