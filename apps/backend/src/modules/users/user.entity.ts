import { type Entity } from "~/libs/types/types.js";

import { UserDetailsEntity } from "./user-details/user-details.entity.js";
import { UserDetailsModel } from "./user-details/user-details.model.js";

type UserDetailsType = {
	firstName: string;
	lastName: string;
};

class UserEntity implements Entity {
	private email: string;

	private id: null | number;

	private passwordHash: string;

	private passwordSalt: string;

	private userDetails: UserDetailsEntity | null;

	private constructor({
		email,
		id,
		passwordHash,
		passwordSalt,
		userDetails,
	}: {
		email: string;
		id: null | number;
		passwordHash: string;
		passwordSalt: string;
		userDetails: UserDetailsModel | null;
	}) {
		this.id = id;
		this.email = email;
		this.passwordHash = passwordHash;
		this.passwordSalt = passwordSalt;
		this.userDetails = userDetails
			? UserDetailsEntity.initialize(userDetails)
			: null;
	}

	public static initialize({
		email,
		id,
		passwordHash,
		passwordSalt,
		userDetails,
	}: {
		email: string;
		id: number;
		passwordHash: string;
		passwordSalt: string;
		userDetails: UserDetailsModel;
	}): UserEntity {
		return new UserEntity({
			email,
			id,
			passwordHash,
			passwordSalt,
			userDetails,
		});
	}

	public static initializeNew({
		email,
		passwordHash,
		passwordSalt,
	}: {
		email: string;
		passwordHash: string;
		passwordSalt: string;
	}): UserEntity {
		return new UserEntity({
			email,
			id: null,
			passwordHash,
			passwordSalt,
			userDetails: null,
		});
	}

	public toNewObject(): {
		email: string;
		passwordHash: string;
		passwordSalt: string;
	} {
		return {
			email: this.email,
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
		};
	}

	public toObject(): {
		email: string;
		id: number;
		userDetails: UserDetailsType | undefined;
	} {
		return {
			email: this.email,
			id: this.id as number,
			userDetails: this.userDetails?.toObject(),
		};
	}
}

export { UserEntity };
