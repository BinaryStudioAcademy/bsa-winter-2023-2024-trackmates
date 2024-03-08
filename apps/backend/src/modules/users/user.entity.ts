import { type Entity, type ValueOf } from "~/libs/types/types.js";

import { type UserSex } from "./libs/enums/enums.js";

class UserEntity implements Entity {
	private avatarUrl: null | string;

	private createdAt: string;

	private email: string;

	private firstName: string;

	private id: null | number;

	private lastName: string;

	private nickname: null | string;

	private passwordHash: string;

	private passwordSalt: string;

	private sex: ValueOf<typeof UserSex> | null;

	public updatedAt: string;

	private constructor({
		avatarUrl,
		createdAt,
		email,
		firstName,
		id,
		lastName,
		nickname,
		passwordHash,
		passwordSalt,
		sex,
		updatedAt,
	}: {
		avatarUrl: null | string;
		createdAt: string;
		email: string;
		firstName: string;
		id: null | number;
		lastName: string;
		nickname: null | string;
		passwordHash: string;
		passwordSalt: string;
		sex: ValueOf<typeof UserSex> | null;
		updatedAt: string;
	}) {
		this.avatarUrl = avatarUrl;
		this.firstName = firstName;
		this.createdAt = createdAt;
		this.id = id;
		this.lastName = lastName;
		this.nickname = nickname;
		this.email = email;
		this.passwordHash = passwordHash;
		this.passwordSalt = passwordSalt;
		this.sex = sex;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		avatarUrl,
		createdAt,
		email,
		firstName,
		id,
		lastName,
		nickname,
		passwordHash,
		passwordSalt,
		sex,
		updatedAt,
	}: {
		avatarUrl: null | string;
		createdAt: string;
		email: string;
		firstName: string;
		id: number;
		lastName: string;
		nickname: null | string;
		passwordHash: string;
		passwordSalt: string;
		sex: ValueOf<typeof UserSex> | null;
		updatedAt: string;
	}): UserEntity {
		return new UserEntity({
			avatarUrl,
			createdAt,
			email,
			firstName,
			id,
			lastName,
			nickname,
			passwordHash,
			passwordSalt,
			sex,
			updatedAt,
		});
	}

	public static initializeNew({
		email,
		firstName,
		lastName,
		passwordHash,
		passwordSalt,
	}: {
		email: string;
		firstName: string;
		lastName: string;
		passwordHash: string;
		passwordSalt: string;
	}): UserEntity {
		return new UserEntity({
			avatarUrl: null,
			createdAt: "",
			email,
			firstName,
			id: null,
			lastName,
			nickname: null,
			passwordHash,
			passwordSalt,
			sex: null,
			updatedAt: "",
		});
	}

	public toNewObject(): {
		avatarUrl: string;
		createdAt: string;
		email: string;
		firstName: string;
		lastName: string;
		nickname: null | string;
		passwordHash: string;
		passwordSalt: string;
		sex: ValueOf<typeof UserSex> | null;
		updatedAt: string;
	} {
		return {
			avatarUrl: this.avatarUrl as string,
			createdAt: this.createdAt,
			email: this.email,
			firstName: this.firstName,
			lastName: this.lastName,
			nickname: this.nickname,
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
			sex: this.sex,
			updatedAt: this.updatedAt,
		};
	}

	public toObject(): {
		avatarUrl: string;
		createdAt: string;
		email: string;
		firstName: string;
		id: number;
		lastName: string;
		nickname: null | string;
		sex: ValueOf<typeof UserSex> | null;
		updatedAt: string;
	} {
		return {
			avatarUrl: this.avatarUrl as string,
			createdAt: this.createdAt,
			email: this.email,
			firstName: this.firstName,
			id: this.id as number,
			lastName: this.lastName,
			nickname: this.nickname,
			sex: this.sex,
			updatedAt: this.updatedAt,
		};
	}
}

export { UserEntity };
