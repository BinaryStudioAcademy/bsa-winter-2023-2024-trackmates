import { type Entity } from "~/libs/types/types.js";

class UserEntity implements Entity {
	private avatarUrl: null | string;

	private createdAt: string;

	private email: string;

	private firstName: string;

	private hasUnreadNotifications: boolean;

	private id: null | number;

	private lastName: string;

	private passwordHash: string;

	private passwordSalt: string;

	public updatedAt: string;

	private constructor({
		avatarUrl,
		createdAt,
		email,
		firstName,
		hasUnreadNotifications,
		id,
		lastName,
		passwordHash,
		passwordSalt,
		updatedAt,
	}: {
		avatarUrl: null | string;
		createdAt: string;
		email: string;
		firstName: string;
		hasUnreadNotifications: boolean;
		id: null | number;
		lastName: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
	}) {
		this.avatarUrl = avatarUrl;
		this.firstName = firstName;
		this.createdAt = createdAt;
		this.hasUnreadNotifications = hasUnreadNotifications;
		this.id = id;
		this.lastName = lastName;
		this.email = email;
		this.passwordHash = passwordHash;
		this.passwordSalt = passwordSalt;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		avatarUrl,
		createdAt,
		email,
		firstName,
		hasUnreadNotifications,
		id,
		lastName,
		passwordHash,
		passwordSalt,
		updatedAt,
	}: {
		avatarUrl: null | string;
		createdAt: string;
		email: string;
		firstName: string;
		hasUnreadNotifications: boolean;
		id: number;
		lastName: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
	}): UserEntity {
		return new UserEntity({
			avatarUrl,
			createdAt,
			email,
			firstName,
			hasUnreadNotifications,
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
			avatarUrl: null,
			createdAt: "",
			email,
			firstName,
			hasUnreadNotifications: false,
			id: null,
			lastName,
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
		hasUnreadNotifications: boolean;
		lastName: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
	} {
		return {
			avatarUrl: this.avatarUrl as string,
			createdAt: this.createdAt,
			email: this.email,
			firstName: this.firstName,
			hasUnreadNotifications: this.hasUnreadNotifications,
			lastName: this.lastName,
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
		hasUnreadNotifications: boolean;
		id: number;
		lastName: string;
		updatedAt: string;
	} {
		return {
			avatarUrl: this.avatarUrl as string,
			createdAt: this.createdAt,
			email: this.email,
			firstName: this.firstName,
			hasUnreadNotifications: this.hasUnreadNotifications,
			id: this.id as number,
			lastName: this.lastName,
			updatedAt: this.updatedAt,
		};
	}
}

export { UserEntity };
