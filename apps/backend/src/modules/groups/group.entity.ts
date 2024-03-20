import { type Entity } from "~/libs/types/types.js";

import {
	type PermissionEntity,
	type PermissionResponseDto,
} from "../permissions/permissions.js";

class GroupEntity implements Entity {
	private createdAt: string;

	private id: null | number;

	private key: string;

	private name: string;

	private permissions: PermissionEntity[];

	private updatedAt: string;

	private constructor({
		createdAt,
		id,
		key,
		name,
		permissions,
		updatedAt,
	}: {
		createdAt: string;
		id: null | number;
		key: string;
		name: string;
		permissions: PermissionEntity[];
		updatedAt: string;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.key = key;
		this.name = name;
		this.permissions = permissions;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		createdAt,
		id,
		key,
		name,
		permissions,
		updatedAt,
	}: {
		createdAt: string;
		id: null | number;
		key: string;
		name: string;
		permissions: PermissionEntity[];
		updatedAt: string;
	}): GroupEntity {
		return new GroupEntity({
			createdAt,
			id,
			key,
			name,
			permissions,
			updatedAt,
		});
	}

	public static initializeNew({
		key,
		name,
		permissions,
	}: {
		key: string;
		name: string;
		permissions: PermissionEntity[];
	}): GroupEntity {
		return new GroupEntity({
			createdAt: "",
			id: null,
			key,
			name,
			permissions,
			updatedAt: "",
		});
	}

	public toNewObject(): {
		key: string;
		name: string;
		permissions: PermissionResponseDto[];
	} {
		return {
			key: this.key,
			name: this.name,
			permissions: this.permissions.map((permission) => permission.toObject()),
		};
	}

	public toObject(): {
		id: number;
		key: string;
		name: string;
		permissions: PermissionResponseDto[];
	} {
		return {
			id: this.id as number,
			key: this.key,
			name: this.name,
			permissions: this.permissions.map((permission) => {
				return permission.toObject();
			}),
		};
	}
}

export { GroupEntity };
