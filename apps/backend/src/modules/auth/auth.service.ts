import { ExceptionMessage, HTTPCode } from "~/libs/enums/enums.js";
import { type Encrypt } from "~/libs/modules/encrypt/encrypt.js";
import { type Mail } from "~/libs/modules/mail/mail.js";
import { type Token } from "~/libs/modules/token/token.js";
import {
	type UserAuthResponseDto,
	type UserEntity,
	type UserService,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/users.js";

import { AuthError } from "./libs/exceptions/exceptions.js";

type Constructor = {
	encrypt: Encrypt;
	mail: Mail;
	token: Token;
	userService: UserService;
};

// TODO
const RESET_PASSWORD_URL = "http://localhost:3000/update-password/";

class AuthService {
	private encrypt: Encrypt;
	private mail: Mail;
	private token: Token;
	private userService: UserService;

	public constructor({ encrypt, mail, token, userService }: Constructor) {
		this.encrypt = encrypt;
		this.mail = mail;
		this.token = token;
		this.userService = userService;
	}

	private async verifyLoginCredentials({
		email,
		password,
	}: UserSignInRequestDto): Promise<UserEntity> | never {
		const user = await this.userService.getByEmail(email);

		if (!user) {
			throw new AuthError({
				message: ExceptionMessage.INVALID_CREDENTIALS,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const { passwordHash, passwordSalt: salt } = user.toNewObject();
		const isEqualPassword = await this.encrypt.compare({
			password,
			passwordHash,
			salt,
		});

		if (!isEqualPassword) {
			throw new AuthError({
				message: ExceptionMessage.INVALID_CREDENTIALS,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		return user;
	}

	public async sendUpdatePasswordLink(email: string): Promise<boolean> {
		const user = await this.userService.getByEmail(email);

		if (!user) {
			throw new AuthError({
				message: ExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const { id: userId } = user.toObject();
		const token = await this.token.create({ userId });
		const link = `${RESET_PASSWORD_URL}${token}`;

		return await this.mail.send({
			email,
			subject: "Reset your password",
			text: `Hello! You can reset your password by link: ${link}`,
		});
	}

	public async signIn(
		userRequestDto: UserSignInRequestDto,
	): Promise<UserSignInResponseDto> {
		const user = await this.verifyLoginCredentials(userRequestDto);

		const { id } = user.toObject();

		return {
			token: await this.token.create({ userId: id }), // todo
			user: user.toObject(),
		};
	}

	public async signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const user = await this.userService.getByEmail(userRequestDto.email);
		const hasUser = Boolean(user);

		if (hasUser) {
			throw new AuthError({
				message: ExceptionMessage.EMAIL_ALREADY_EXISTS,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const newUser = await this.userService.create(userRequestDto);

		return {
			token: await this.token.create({ userId: newUser.id }),
			user: newUser,
		};
	}

	public async updatePassword(
		password: string,
		token: string,
	): Promise<UserAuthResponseDto> {
		const { payload: { userId } } = await this.token.verify(token);

		const user = await this.userService.findById(userId);

		if (!user) {
			throw new AuthError({
				message: ExceptionMessage.UNAUTHORIZED,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		const updatedUser = await this.userService.updatePassword(userId, password);

		return updatedUser as UserAuthResponseDto;
	}
}

export { AuthService };
