import { type ValueOf } from "../../../../libs/types/types.js";
import { type MessageStatus } from "../enums/enums.js";

type ChatMessageUpdateRequestDto = {
	status: ValueOf<typeof MessageStatus>;
	text: string;
};

export { type ChatMessageUpdateRequestDto };
