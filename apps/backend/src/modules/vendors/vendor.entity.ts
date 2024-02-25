import { type Entity } from "~/libs/types/types.js";

class VendorEntity implements Entity {
	private createdAt: string;

	private id: null | number;

	public key: string;

	public name: string;

	public updatedAt: string;

	public url: string;

	private constructor({
		createdAt,
		id,
		key,
		name,
		updatedAt,
		url,
	}: {
		createdAt: string;
		id: null | number;
		key: string;
		name: string;
		updatedAt: string;
		url: string;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.key = key;
		this.name = name;
		this.url = url;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		createdAt,
		id,
		key,
		name,
		updatedAt,
		url,
	}: {
		createdAt: string;
		id: null | number;
		key: string;
		name: string;
		updatedAt: string;
		url: string;
	}): VendorEntity {
		return new VendorEntity({
			createdAt,
			id,
			key,
			name,
			updatedAt,
			url,
		});
	}

	public static initializeNew({
		key,
		name,
		url,
	}: {
		key: string;
		name: string;
		url: string;
	}): VendorEntity {
		return new VendorEntity({
			createdAt: "",
			id: null,
			key,
			name,
			updatedAt: "",
			url,
		});
	}

	public toNewObject(): {
		key: string;
		name: string;
		url: string;
	} {
		return {
			key: this.key,
			name: this.name,
			url: this.url,
		};
	}

	public toObject(): {
		id: number;
		key: string;
		name: string;
		url: string;
	} {
		return {
			id: this.id as number,
			key: this.key,
			name: this.name,
			url: this.url,
		};
	}
}

export { VendorEntity };
