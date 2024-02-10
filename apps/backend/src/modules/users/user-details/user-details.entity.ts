import { type Entity } from "~/libs/types/types.js";

class UserDetailsEntity implements Entity {
	private id: null | number;

	private firstName: null | string;

	private userId: number;

	private lastName: null | string;

	private constructor({
		id,
		firstName,
		userId,
		lastName,
	}: {
		id: null | number;
		firstName: null | string;
		userId: number;
		lastName: null | string;
	}) {
		this.id = id;
		this.firstName = firstName;
		this.userId = userId;
		this.lastName = lastName;
	}

	public static initialize({
		id,
		firstName,
		userId,
		lastName,
	}: {
		id: number;
		firstName: null | string;
		userId: number;
		lastName: null | string;
	}): UserDetailsEntity {
		return new UserDetailsEntity({
			id,
			firstName,
			userId,
			lastName,
		});
	}

	public static initializeNew({
		firstName,
		userId,
		lastName,
	}: {
		firstName: null | string;
		userId: number;
		lastName: null | string;
	}): UserDetailsEntity {
		return new UserDetailsEntity({
			id: null,
			firstName,
			userId,
			lastName,
		});
	}

	public toNewObject(): {
		firstName: null | string;
		userId: null | number;
		lastName: null | string;
	} {
		return {
			firstName: this.firstName,
			lastName: this.lastName,
			userId: this.userId,
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
