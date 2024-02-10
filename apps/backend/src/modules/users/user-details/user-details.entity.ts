import { type Entity } from "~/libs/types/types.js";

class UserDetailsEntity implements Entity {
	private firstName: null | string;

	private id: null | number;

	private lastName: null | string;

	private userId: number;

	private constructor({
		firstName,
		id,
		lastName,
		userId,
	}: {
		firstName: null | string;
		id: null | number;
		lastName: null | string;
		userId: number;
	}) {
		this.firstName = firstName;
		this.id = id;
		this.lastName = lastName;
		this.userId = userId;
	}

	public static initialize({
		firstName,
		id,
		lastName,
		userId,
	}: {
		firstName: null | string;
		id: number;
		lastName: null | string;
		userId: number;
	}): UserDetailsEntity {
		return new UserDetailsEntity({
			firstName,
			id,
			lastName,
			userId,
		});
	}

	public static initializeNew({
		firstName,
		lastName,
		userId,
	}: {
		firstName: null | string;
		lastName: null | string;
		userId: number;
	}): UserDetailsEntity {
		return new UserDetailsEntity({
			firstName,
			id: null,
			lastName,
			userId,
		});
	}

	public toNewObject(): {
		firstName: null | string;
		lastName: null | string;
		userId: null | number;
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
