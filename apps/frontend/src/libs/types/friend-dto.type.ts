import { FriendStatus } from "../enums/enums.js";
import { type ValueOf } from "./value-of.type.js";

type FriendDto = {
	fullName: string;
	id: number;
	status: ValueOf<typeof FriendStatus>;
};

export { type FriendDto };
