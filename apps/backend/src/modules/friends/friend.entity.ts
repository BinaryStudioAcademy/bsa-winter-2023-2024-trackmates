import { type Entity } from "~/libs/types/types.js";

import { UserModel } from "../users/user.model.js";

class FriendsEntity implements Entity {
	private createdAt: string;

	public id: null | number;

	public isFollowing: boolean;

	public recipientUser: UserModel | null;

	public recipientUserId: number;

	public senderUser: UserModel | null;

	public senderUserId: number;

	public updatedAt: string;

	private constructor({
		createdAt,
		id,
		isFollowing,
		recipientUser,
		recipientUserId,
		senderUser,
		senderUserId,
		updatedAt,
	}: {
		createdAt: string;
		id: null | number;
		isFollowing: boolean;
		recipientUser: UserModel | null;
		recipientUserId: number;
		senderUser: UserModel | null;
		senderUserId: number;
		updatedAt: string;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.isFollowing = isFollowing;
		this.recipientUser = recipientUser;
		this.recipientUserId = recipientUserId;
		this.senderUser = senderUser;
		this.senderUserId = senderUserId;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		createdAt,
		id,
		isFollowing,
		recipientUser,
		recipientUserId,
		senderUser,
		senderUserId,
		updatedAt,
	}: {
		createdAt: string;
		id: null | number;
		isFollowing: boolean;
		recipientUser: UserModel | null;
		recipientUserId: number;
		senderUser: UserModel | null;
		senderUserId: number;
		updatedAt: string;
	}): FriendsEntity {
		return new FriendsEntity({
			createdAt,
			id,
			isFollowing,
			recipientUser,
			recipientUserId,
			senderUser,
			senderUserId,
			updatedAt,
		});
	}

	public static initializeNew({
		recipientUser,
		recipientUserId,
		senderUser,
		senderUserId,
	}: {
		recipientUser: UserModel | null;
		recipientUserId: number;
		senderUser: UserModel | null;
		senderUserId: number;
	}): FriendsEntity {
		return new FriendsEntity({
			createdAt: "",
			id: null,
			isFollowing: true,
			recipientUser: recipientUser,
			recipientUserId,
			senderUser: senderUser,
			senderUserId,
			updatedAt: "",
		});
	}

	public toNewObject(): {
		createdAt: string;
		isFollowing: boolean;
		recipientUserId: number;
		senderUserId: number;
		updatedAt: string;
	} {
		return {
			createdAt: this.createdAt,
			isFollowing: this.isFollowing,
			recipientUserId: this.recipientUserId,
			senderUserId: this.senderUserId,
			updatedAt: this.updatedAt,
		};
	}

	public toObject(): {
		createdAt: string;
		id: number;
		isFollowing: boolean;
		recipientUser?: UserModel | null;
		recipientUserId: number;
		senderUser?: UserModel | null;
		senderUserId: number;
		updatedAt: string;
	} {
		const newObject: {
			createdAt: string;
			id: number;
			isFollowing: boolean;
			recipientUser?: UserModel | null;
			recipientUserId: number;
			senderUser?: UserModel | null;
			senderUserId: number;
			updatedAt: string;
		} = {
			createdAt: this.createdAt,
			id: this.id as number,
			isFollowing: this.isFollowing,
			recipientUserId: this.recipientUserId,
			senderUserId: this.senderUserId,
			updatedAt: this.updatedAt,
		};

		if (this.recipientUser !== null) {
			newObject.recipientUser = this.recipientUser;
		}

		if (this.senderUser !== null) {
			newObject.senderUser = this.senderUser;
		}

		return newObject;
	}
}

export { FriendsEntity };
