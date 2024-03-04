import { type Entity } from "~/libs/types/types.js";

import { type GroupEntity, type GroupResponseDto } from "../groups/groups.js";

class UserEntity implements Entity {
	private avatarUrl: null | string;

	private createdAt: string;

	private email: string;

	private firstName: string;

	private groups: GroupEntity[];

	private id: null | number;

	private lastName: string;

	private nickname: null | string;

	private passwordHash: string;

	private passwordSalt: string;

	public updatedAt: string;

	private constructor({
		avatarUrl,
		createdAt,
		email,
		firstName,
		groups,
		id,
		lastName,
		nickname,
		passwordHash,
		passwordSalt,
		updatedAt,
	}: {
		avatarUrl: null | string;
		createdAt: string;
		email: string;
		firstName: string;
		groups: GroupEntity[];
		id: null | number;
		lastName: string;
		nickname: null | string;
		passwordHash: string;
		passwordSalt: string;
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
		this.updatedAt = updatedAt;
		this.groups = groups;
	}

	public static initialize({
		avatarUrl,
		createdAt,
		email,
		firstName,
		groups,
		id,
		lastName,
		nickname,
		passwordHash,
		passwordSalt,
		updatedAt,
	}: {
		avatarUrl: null | string;
		createdAt: string;
		email: string;
		firstName: string;
		groups: GroupEntity[];
		id: number;
		lastName: string;
		nickname: null | string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
	}): UserEntity {
		return new UserEntity({
			avatarUrl,
			createdAt,
			email,
			firstName,
			groups,
			id,
			lastName,
			nickname,
			passwordHash,
			passwordSalt,
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
			groups: [],
			id: null,
			lastName,
			nickname: null,
			passwordHash,
			passwordSalt,
			updatedAt: "",
		});
	}

	public toNewObject(): {
		avatarUrl: string;
		createdAt: string;
		email: string;
		firstName: string;
		groups: GroupResponseDto[];
		lastName: string;
		nickname: null | string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
	} {
		return {
			avatarUrl: this.avatarUrl as string,
			createdAt: this.createdAt,
			email: this.email,
			firstName: this.firstName,
			groups: [],
			lastName: this.lastName,
			nickname: this.nickname,
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
			updatedAt: this.updatedAt,
		};
	}

	public toObject(): {
		avatarUrl: string;
		createdAt: string;
		email: string;
		firstName: string;
		groups: GroupResponseDto[];
		id: number;
		lastName: string;
		nickname: null | string;
		updatedAt: string;
	} {
		return {
			avatarUrl: this.avatarUrl as string,
			createdAt: this.createdAt,
			email: this.email,
			firstName: this.firstName,
			groups: this.groups.map((group) => {
				return group.toObject();
			}),
			id: this.id as number,
			lastName: this.lastName,
			nickname: this.nickname,
			updatedAt: this.updatedAt,
		};
	}
}

export { UserEntity };
