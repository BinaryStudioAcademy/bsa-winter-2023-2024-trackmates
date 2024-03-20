import { type UserAuthResponseDto } from "~/modules/users/users.js";

const DEFAULT_USER = {
	avatarUrl: null,
	createdAt: "",
	email: "email@example.com",
	firstName: "FirstName",
	groups: [],
	id: 1,
	lastName: "LastName",
	nickname: null,
	sex: null,
	subscription: null,
	updatedAt: "",
} as UserAuthResponseDto;

export { DEFAULT_USER };
