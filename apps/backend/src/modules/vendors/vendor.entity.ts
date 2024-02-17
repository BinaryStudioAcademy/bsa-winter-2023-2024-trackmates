import { type Entity } from "~/libs/types/types.js";

class VendorEntity implements Entity {
	private createdAt: string;

	private id: null | number;

	public key!: string;

	public name!: string;

	public updatedAt: string;

	private constructor({
		createdAt,
		id,
		key,
		name,
		updatedAt,
	}: {
		createdAt: string;
		id: null | number;
		key: string;
		name: string;
		updatedAt: string;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.key = key;
		this.name = name;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		createdAt,
		id,
		key,
		name,
		updatedAt,
	}: {
		createdAt: string;
		id: null | number;
		key: string;
		name: string;
		updatedAt: string;
	}): VendorEntity {
		return new VendorEntity({
			createdAt,
			id,
			key,
			name,
			updatedAt,
		});
	}

	public static initializeNew({
		key,
		name,
	}: {
		key: string;
		name: string;
	}): VendorEntity {
		return new VendorEntity({
			createdAt: "",
			id: null,
			key,
			name,
			updatedAt: "",
		});
	}

	public toNewObject(): {
		createdAt: string;
		key: string;
		name: string;
		updatedAt: string;
	} {
		return {
			createdAt: this.createdAt,
			key: this.key,
			name: this.name,
			updatedAt: this.updatedAt,
		};
	}

	public toObject(): {
		id: number;
		key: string;
		name: string;
	} {
		return {
			id: this.id as number,
			key: this.key,
			name: this.name,
		};
	}
}

export { VendorEntity };
