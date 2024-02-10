import { UserSignUpRequestDto, UserSignUpResponseDto } from "shared";

type AuthService = {
	signUp(userRequestDto: UserSignUpRequestDto): Promise<UserSignUpResponseDto>;
	// signIn(userRequestDto: UserSignInRequestDto): Promise<UserSignInResponseDto>;
};

export { type AuthService };
