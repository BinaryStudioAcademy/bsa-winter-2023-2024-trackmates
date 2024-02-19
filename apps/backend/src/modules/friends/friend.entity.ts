import { type Entity } from "~/libs/types/types.js";

import { UserDetailsModel } from "../users/user-details/user-details.model.js";

class FriendEntity implements Entity {
	private createdAt: string;

	public id: null | number;

	public isInvitationAccepted: boolean | null;

	public recipientUser: UserDetailsModel | null;

	public recipientUserId: number;

	public senderUser: UserDetailsModel | null;

	public senderUserId: number;

	public updatedAt: string;

	private constructor({
		createdAt,
		id,
		isInvitationAccepted,
		recipientUser,
		recipientUserId,
		senderUser,
		senderUserId,
		updatedAt,
	}: {
		createdAt: string;
		id: null | number;
		isInvitationAccepted: boolean | null;
		recipientUser: UserDetailsModel | null;
		recipientUserId: number;
		senderUser: UserDetailsModel | null;
		senderUserId: number;
		updatedAt: string;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.isInvitationAccepted = isInvitationAccepted;
		this.recipientUser = recipientUser;
		this.recipientUserId = recipientUserId;
		this.senderUser = senderUser;
		this.senderUserId = senderUserId;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		createdAt,
		id,
		isInvitationAccepted,
		recipientUser,
		recipientUserId,
		senderUser,
		senderUserId,
		updatedAt,
	}: {
		createdAt: string;
		id: null | number;
		isInvitationAccepted: boolean | null;
		recipientUser: UserDetailsModel | null;
		recipientUserId: number;
		senderUser: UserDetailsModel | null;
		senderUserId: number;
		updatedAt: string;
	}): FriendEntity {
		return new FriendEntity({
			createdAt,
			id,
			isInvitationAccepted,
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
		recipientUser: UserDetailsModel | null;
		recipientUserId: number;
		senderUser: UserDetailsModel | null;
		senderUserId: number;
	}): FriendEntity {
		return new FriendEntity({
			createdAt: "",
			id: null,
			isInvitationAccepted: null,
			recipientUser: recipientUser,
			recipientUserId,
			senderUser: senderUser,
			senderUserId,
			updatedAt: "",
		});
	}

	public toNewObject(): {
		createdAt: string;
		isInvitationAccepted: boolean | null;
		recipientUserId: number;
		senderUserId: number;
		updatedAt: string;
	} {
		return {
			createdAt: this.createdAt,
			isInvitationAccepted: this.isInvitationAccepted,
			recipientUserId: this.recipientUserId,
			senderUserId: this.senderUserId,
			updatedAt: this.updatedAt,
		};
	}

	public toObject(): {
		createdAt: string;
		id: number;
		isInvitationAccepted: boolean | null;
		recipientUser?: UserDetailsModel | null;
		recipientUserId: number;
		senderUser?: UserDetailsModel | null;
		senderUserId: number;
		updatedAt: string;
	} {
		const newObject: {
			createdAt: string;
			id: number;
			isInvitationAccepted: boolean | null;
			recipientUser?: UserDetailsModel | null;
			recipientUserId: number;
			senderUser?: UserDetailsModel | null;
			senderUserId: number;
			updatedAt: string;
		} = {
			createdAt: this.createdAt,
			id: this.id as number,
			isInvitationAccepted: this.isInvitationAccepted,
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

export { FriendEntity };
