import { getAllChats, getAllMessages, sendMessage } from "./actions.js";
import { actions } from "./chat.slice.js";

const allAction = {
	...actions,
	getAllChats,
	getAllMessages,
	sendMessage,
};

export { reducer } from "./chat.slice.js";
export { allAction as actions };
