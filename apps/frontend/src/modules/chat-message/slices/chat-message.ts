import {
	createChat,
	getAllChats,
	getAllMessages,
	sendMessage,
} from "./actions.js";
import { actions } from "./chat-message.slice.js";

const allAction = {
	...actions,
	createChat,
	getAllChats,
	getAllMessages,
	sendMessage,
};

export { reducer } from "./chat-message.slice.js";
export { allAction as actions };
