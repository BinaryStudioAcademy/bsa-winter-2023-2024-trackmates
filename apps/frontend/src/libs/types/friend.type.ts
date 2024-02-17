import { FriendStatus } from "../enums/enums.js";
import { type ValueOf } from "./value-of.type.js";

type Friend = {
	fullName: string;
	id: number;
	imageUrl: string;
	status: ValueOf<typeof FriendStatus>;
};

export { type Friend };
