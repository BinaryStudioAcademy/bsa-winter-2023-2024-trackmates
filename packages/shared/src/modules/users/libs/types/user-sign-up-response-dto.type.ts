type UserSignUpResponseDto = {
	token: string;
	user: {
		email: string;
		id: number;
	};
};

export { type UserSignUpResponseDto };
