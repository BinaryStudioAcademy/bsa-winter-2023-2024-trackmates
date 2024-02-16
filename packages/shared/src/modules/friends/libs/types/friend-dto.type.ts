import { type FriendStatus } from "./friend-status.type.js";

type FriendDto = {
	fullName: string;
	imageUrl: string;
	status: FriendStatus;
	userId: number;
};

export { type FriendDto };
