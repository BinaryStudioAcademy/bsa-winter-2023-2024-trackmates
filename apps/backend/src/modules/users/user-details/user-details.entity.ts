import { type Entity } from "~/libs/types/types.js";

class UserDetailsEntity implements Entity {
	private id: null | number;

	private userId: number;

	private firstName: null | string;

	private lastName: null | string;

	private constructor({
		id,
		userId,
		firstName,
		lastName,
	}: {
		id: null | number;
		userId: number;
		firstName: null | string;
		lastName: null | string;
	}) {
		this.id = id;
		this.userId = userId;
		this.lastName = lastName;
		this.firstName = firstName;
	}

	public static initialize({
		id,
		userId,
		firstName,
		lastName,
	}: {
		id: number;
		userId: number;
		firstName: null | string;
		lastName: null | string;
	}): UserDetailsEntity {
		return new UserDetailsEntity({
			id,
			userId,
			firstName,
			lastName,
		});
	}

	public static initializeNew({
		userId,
		firstName,
		lastName,
	}: {
		userId: number;
		firstName: null | string;
		lastName: null | string;
	}): UserDetailsEntity {
		return new UserDetailsEntity({
			id: null,
			userId,
			firstName,
			lastName,
		});
	}

	public toNewObject(): {
		userId: null | number;
		firstName: null | string;
		lastName: null | string;
	} {
		return {
			userId: this.userId,
			lastName: this.lastName,
			firstName: this.firstName,
		};
	}

	public toObject(): {
		firstName: string;
		lastName: string;
	} {
		return {
			firstName: this.firstName ?? "",
			lastName: this.lastName ?? "",
		};
	}
}

export { UserDetailsEntity };
