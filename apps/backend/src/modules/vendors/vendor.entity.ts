import { type Entity, type ValueOf } from "~/libs/types/types.js";

import { type VendorKey } from "./libs/enums/enums.js";

class VendorEntity implements Entity {
	private createdAt: string;

	private id: null | number;

	public key: ValueOf<typeof VendorKey>;

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
		key: ValueOf<typeof VendorKey>;
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
		key: ValueOf<typeof VendorKey>;
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
		key: ValueOf<typeof VendorKey>;
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
		key: ValueOf<typeof VendorKey>;
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
		key: ValueOf<typeof VendorKey>;
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
