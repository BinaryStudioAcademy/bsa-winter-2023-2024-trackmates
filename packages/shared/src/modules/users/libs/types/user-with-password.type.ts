import { type User } from "./user.type.js";

type UserWithPassword = User & {
	passwordHash: string;
	passwordSalt: string;
};

export { type UserWithPassword };
