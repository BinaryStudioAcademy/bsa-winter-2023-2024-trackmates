import { type Entity } from "~/libs/types/types.js";

class UserEntity implements Entity {
	private createdAt: string;

	private email: string;

	private firstName: string;

	private id: null | number;

	private lastName: string;

	private passwordHash: string;

	private passwordSalt: string;

	public updatedAt: string;

	private constructor({
		createdAt,
		email,
		firstName,
		id,
		lastName,
		passwordHash,
		passwordSalt,
		updatedAt,
	}: {
		createdAt: string;
		email: string;
		firstName: string;
		id: null | number;
		lastName: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
	}) {
		this.firstName = firstName;
		this.createdAt = createdAt;
		this.id = id;
		this.lastName = lastName;
		this.email = email;
		this.passwordHash = passwordHash;
		this.passwordSalt = passwordSalt;
		this.updatedAt = updatedAt;
	}
	public static initialize({
		createdAt,
		email,
		firstName,
		id,
		lastName,
		passwordHash,
		passwordSalt,
		updatedAt,
	}: {
		createdAt: string;
		email: string;
		firstName: string;
		id: number;
		lastName: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
	}): UserEntity {
		return new UserEntity({
			createdAt,
			email,
			firstName,
			id,
			lastName,
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
			createdAt: "",
			email,
			firstName,
			id: null,
			lastName,
			passwordHash,
			passwordSalt,
			updatedAt: "",
		});
	}

	public toNewObject(): {
		createdAt: string;
		email: string;
		firstName: string;
		lastName: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
	} {
		return {
			createdAt: this.createdAt,
			email: this.email,
			firstName: this.firstName,
			lastName: this.lastName,
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
			updatedAt: this.updatedAt,
		};
	}

	public toObject(): {
		createdAt: string;
		email: string;
		firstName: string;
		id: number;
		lastName: string;
		updatedAt: string;
	} {
		return {
			createdAt: this.createdAt,
			email: this.email,
			firstName: this.firstName,
			id: this.id as number,
			lastName: this.lastName,
			updatedAt: this.updatedAt,
		};
	}
}

export { UserEntity };
