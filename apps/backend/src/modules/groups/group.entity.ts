import { type Entity } from "~/libs/types/types.js";

class GroupEntity implements Entity {
	private createdAt: string;

	private id: null | number;

	private key: string;

	private name: string;

	private updatedAt: string;

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
	}): GroupEntity {
		return new GroupEntity({
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
	}): GroupEntity {
		return new GroupEntity({
			createdAt: "",
			id: null,
			key,
			name,
			updatedAt: "",
		});
	}

	public toNewObject(): { key: string; name: string } {
		return {
			key: this.key,
			name: this.name,
		};
	}

	public toObject(): {
		createdAt: string;
		id: number;
		key: string;
		name: string;
		updatedAt: string;
	} {
		return {
			createdAt: this.createdAt,
			id: this.id as number,
			key: this.key,
			name: this.name,
			updatedAt: this.updatedAt,
		};
	}
}

export { GroupEntity };
