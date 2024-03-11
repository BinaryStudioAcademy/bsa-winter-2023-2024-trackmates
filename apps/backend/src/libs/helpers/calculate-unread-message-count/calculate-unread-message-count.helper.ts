import { EMPTY_ARRAY_LENGTH } from "~/libs/constants/constants.js";
import { type ChatModel } from "~/modules/chats/chat.model.js";

const calculateUnreadMessageCount = (chats: ChatModel[]): number => {
	return chats.reduce((total, chat) => {
		return total + chat.messages.length;
	}, EMPTY_ARRAY_LENGTH);
};

export { calculateUnreadMessageCount };
