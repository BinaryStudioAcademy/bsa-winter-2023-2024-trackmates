import { UserSignUpRequestDto, UserSignUpResponseDto } from "shared";

type AuthService = {
	signUp(userRequestDto: UserSignUpRequestDto): Promise<UserSignUpResponseDto>;
};

export { type AuthService };
