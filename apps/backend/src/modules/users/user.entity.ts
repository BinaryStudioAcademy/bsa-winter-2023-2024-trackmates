import { type Entity } from "~/libs/types/types.js";

class UserEntity implements Entity {
	private createdAt: string;

	private email: string;

	private id: null | number;

	private passwordHash: string;

	private passwordSalt: string;

	private updatedAt: string;

	constructor({
		createdAt,
		email,
		id,
		passwordHash,
		passwordSalt,
		updatedAt,
	}: {
		createdAt: string;
		email: string;
		id: null | number;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.email = email;
		this.passwordHash = passwordHash;
		this.passwordSalt = passwordSalt;
		this.updatedAt = updatedAt;
	}
	public static initialize({
		createdAt,
		email,
		id,
		passwordHash,
		passwordSalt,
		updatedAt,
	}: {
		createdAt: string;
		email: string;
		id: number;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
	}): UserEntity {
		return new UserEntity({
			createdAt,
			email,
			id,
			passwordHash,
			passwordSalt,
			updatedAt,
		});
	}

	public static initializeNew({
		createdAt,
		email,
		passwordHash,
		passwordSalt,
		updatedAt,
	}: {
		createdAt: string;
		email: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
	}): UserEntity {
		return new UserEntity({
			createdAt,
			email,
			id: null,
			passwordHash,
			passwordSalt,
			updatedAt,
		});
	}

	public toNewObject(): {
		createdAt: string;
		email: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
	} {
		return {
			createdAt: this.createdAt,
			email: this.email,
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
			updatedAt: this.updatedAt,
		};
	}

	public toObject(): {
		createdAt: string;
		email: string;
		id: number;
		updatedAt: string;
	} {
		return {
			createdAt: this.createdAt,
			email: this.email,
			id: this.id as number,
			updatedAt: this.updatedAt,
		};
	}
}

export { UserEntity };
