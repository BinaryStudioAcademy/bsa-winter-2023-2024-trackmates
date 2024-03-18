import { type Entity } from "~/libs/types/types.js";

class SubscriptionEntity implements Entity {
	private createdAt: string;

	private expiresAt: string;

	private id: null | number;

	private updatedAt: string;

	private constructor({
		createdAt,
		expiresAt,
		id,
		updatedAt,
	}: {
		createdAt: string;
		expiresAt: string;
		id: null | number;
		updatedAt: string;
	}) {
		this.id = id;
		this.expiresAt = expiresAt;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		createdAt,
		expiresAt,
		id,
		updatedAt,
	}: {
		createdAt: string;
		expiresAt: string;
		id: null | number;
		updatedAt: string;
	}): SubscriptionEntity {
		return new SubscriptionEntity({ createdAt, expiresAt, id, updatedAt });
	}

	public static initializeNew({
		expiresAt,
	}: {
		expiresAt: string;
	}): SubscriptionEntity {
		return new SubscriptionEntity({
			createdAt: "",
			expiresAt,
			id: null,
			updatedAt: "",
		});
	}

	public toNewObject(): { expiresAt: string } {
		return {
			expiresAt: this.expiresAt,
		};
	}

	public toObject(): {
		expiresAt: string;
		id: number;
	} {
		return {
			expiresAt: this.expiresAt,
			id: this.id as number,
		};
	}
}

export { SubscriptionEntity };
