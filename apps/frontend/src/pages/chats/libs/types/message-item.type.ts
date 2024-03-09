import { type ValueOf } from "~/libs/types/types.js";
import { type ChatMessageItemResponseDto } from "~/modules/chat-messages/chat-messages.js";

import { type MessageItemOption } from "../enums/enums.js";

type MessageItem = {
	type: ValueOf<typeof MessageItemOption>;
	value: ChatMessageItemResponseDto | string;
};

export { type MessageItem };
