import { type Entity } from "~/libs/types/types.js";

class PushSubscriptionEntity implements Entity {
	private authKey: string;

	private createdAt: string;

	private endpoint: string;

	private expirationTime: null | number;

	private id: null | number;

	private p256dhKey: string;

	private updatedAt: string;

	private constructor({
		authKey,
		createdAt,
		endpoint,
		expirationTime,
		id,
		p256dhKey,
		updatedAt,
	}: {
		authKey: string;
		createdAt: string;
		endpoint: string;
		expirationTime: null | number;
		id: null | number;
		p256dhKey: string;
		updatedAt: string;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.authKey = authKey;
		this.endpoint = endpoint;
		this.p256dhKey = p256dhKey;
		this.expirationTime = expirationTime;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		authKey,
		createdAt,
		endpoint,
		expirationTime,
		id,
		p256dhKey,
		updatedAt,
	}: {
		authKey: string;
		createdAt: string;
		endpoint: string;
		expirationTime: null | number;
		id: null | number;
		p256dhKey: string;
		updatedAt: string;
	}): PushSubscriptionEntity {
		return new PushSubscriptionEntity({
			authKey,
			createdAt,
			endpoint,
			expirationTime,
			id,
			p256dhKey,
			updatedAt,
		});
	}

	public static initializeNew({
		authKey,
		endpoint,
		expirationTime,
		p256dhKey,
	}: {
		authKey: string;
		endpoint: string;
		expirationTime: null | number;
		p256dhKey: string;
	}): PushSubscriptionEntity {
		return new PushSubscriptionEntity({
			authKey,
			createdAt: "",
			endpoint,
			expirationTime,
			id: null,
			p256dhKey,
			updatedAt: "",
		});
	}

	public toNewObject(): {
		authKey: string;
		endpoint: string;
		expirationTime: null | number;
		p256dhKey: string;
	} {
		return {
			authKey: this.authKey,
			endpoint: this.endpoint,
			expirationTime: this.expirationTime,
			p256dhKey: this.p256dhKey,
		};
	}

	public toObject(): {
		authKey: string;
		endpoint: string;
		expirationTime: null | number;
		id: number;
		p256dhKey: string;
	} {
		return {
			authKey: this.authKey,
			endpoint: this.endpoint,
			expirationTime: this.expirationTime,
			id: this.id as number,
			p256dhKey: this.p256dhKey,
		};
	}
}

export { PushSubscriptionEntity };
