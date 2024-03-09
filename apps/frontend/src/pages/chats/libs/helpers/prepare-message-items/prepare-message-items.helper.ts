import { PREVIOUS_INDEX_OFFSET } from "~/libs/constants/constants.js";
import { checkIsDatePrecedesAnotherByOneDay } from "~/libs/helpers/helpers.js";
import { type ChatMessageItemResponseDto } from "~/modules/chat-messages/chat-messages.js";

import { MessageItemOption } from "../../enums/enums.js";
import { type MessageItem } from "../../types/types.js";

const prepareMessageItems = (
	messages: ChatMessageItemResponseDto[],
): MessageItem[] => {
	const items = [];

	for (const [index, message] of messages.entries()) {
		const previousMessage = messages[index - PREVIOUS_INDEX_OFFSET];

		const isDatePrecedingByOneDay =
			previousMessage &&
			checkIsDatePrecedesAnotherByOneDay(
				message.createdAt,
				previousMessage.createdAt,
			);

		if (isDatePrecedingByOneDay) {
			items.push({
				type: MessageItemOption.DATE,
				value: previousMessage.createdAt,
			});
		}

		items.push({ type: MessageItemOption.MESSAGE, value: message });
	}

	return items;
};

export { prepareMessageItems };
