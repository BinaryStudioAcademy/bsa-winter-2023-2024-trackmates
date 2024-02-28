import { type UserAuthResponseDto } from "../../../users/users.js";

type ChatResponseDto = {
	createdAt: string;
	firstUser: UserAuthResponseDto;
	id: number;
	secondUser: UserAuthResponseDto;
	updatedAt: string;
};

export { type ChatResponseDto };
