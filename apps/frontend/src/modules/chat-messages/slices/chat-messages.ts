import { sendMessage, setReadChatMessages } from "./actions.js";
import { actions } from "./chat-messages.slice.js";

const allAction = {
	...actions,
	sendMessage,
	setReadChatMessages,
};

export { reducer } from "./chat-messages.slice.js";
export { allAction as actions };
