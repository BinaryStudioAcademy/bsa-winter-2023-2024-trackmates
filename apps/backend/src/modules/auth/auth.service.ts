import { Token } from "~/libs/modules/token/token.js";
import {
	UserEntity,
	type UserService,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/users.js";

type Constructor = {
	token: Token;
	userService: UserService;
};

class AuthService {
	private token: Token;
	private userService: UserService;

	public constructor({ token, userService }: Constructor) {
		this.token = token;
		this.userService = userService;
	}

	public async signIn(
		userRequestDto: UserSignInRequestDto,
	): Promise<UserSignInResponseDto> {
		const { email } = userRequestDto;

		const user = (await this.userService.getByEmail(email)) as UserEntity;
		const { id } = user.toObject();

		return {
			token: await this.token.create({ userId: id }),
			user: user.toObject(),
		};
	}

	public async signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		return await this.userService.create(userRequestDto);
	}
}

export { AuthService };
