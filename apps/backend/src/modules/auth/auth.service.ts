import { Encript } from "~/libs/modules/encript/encript.js";
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
	encript: Encript;
	tokenizer: Tokenizer;
	userService: UserService;
};

import { ErrorMessage } from "./libs/enums/enums.js";

class AuthService {
	private encript: Encript;
	private tokenizer: Tokenizer;
	private userService: UserService;

	public constructor({ encript, tokenizer, userService }: Constructor) {
		this.encript = encript;
		this.tokenizer = tokenizer;
		this.userService = userService;
	}

	private async verifyLoginCredentials({
		email,
		password,
	}: UserSignInRequestDto): Promise<UserWithPassword> | never {
		const user = await this.userService.getByEmail(email);

		if (!user) {
			throw new AuthError(ErrorMessage.INCORRECT_EMAIL);
		}

		const isEqualPassword = await this.encript.compare(
			password,
			user.passwordHash,
			user.passwordSalt,
		);

		if (!isEqualPassword) {
			throw new AuthError(ErrorMessage.PASSWORDS_NOT_MATCH);
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

	public async signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const userWithSuchEmail = await this.userService.getByEmail(
			userRequestDto.email,
		);
		const isUserWithSuchEmailExisting = Boolean(userWithSuchEmail);
		if (isUserWithSuchEmailExisting) {
			throw new AuthError(ErrorMessage.EMAIL_ALREADY_EXISTS);
		}
		return await this.userService.create(userRequestDto);
	}
}

export { AuthService };
