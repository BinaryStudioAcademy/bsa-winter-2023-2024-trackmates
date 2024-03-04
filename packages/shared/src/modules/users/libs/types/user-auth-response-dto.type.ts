import { type GroupResponseDto } from "../../../groups/groups.js";

type UserAuthResponseDto = {
	avatarUrl: null | string;
	createdAt: string;
	email: string;
	firstName: string;
	groups: GroupResponseDto[];
	id: number;
	lastName: string;
	nickname: null | string;
	updatedAt: string;
};

export { type UserAuthResponseDto };
