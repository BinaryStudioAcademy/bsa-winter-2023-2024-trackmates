import { EMPTY_ARRAY_LENGTH } from "~/libs/constants/constants.js";
import { type ChatGetAllItemResponseDto } from "~/modules/chats/chats.js";

const calculateUnreadChatsCount = (
	chats: ChatGetAllItemResponseDto[],
): number => {
	return chats.reduce((total, chat) => {
		return total + Number(chat.unreadMessageCount);
	}, EMPTY_ARRAY_LENGTH);
};

export { calculateUnreadChatsCount };
