import { getAllChats, getAllMessages, sendMessage } from "./actions.js";
import { actions } from "./chat-message.slice.js";

const allAction = {
	...actions,
	getAllChats,
	getAllMessages,
	sendMessage,
};

export { reducer } from "./chat-message.slice.js";
export { allAction as actions };
