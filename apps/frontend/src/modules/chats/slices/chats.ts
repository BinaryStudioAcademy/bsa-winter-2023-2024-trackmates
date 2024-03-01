import { createChat, getAllChats, getChat } from "./actions.js";
import { actions } from "./chats.slice.js";

const allAction = {
	...actions,
	createChat,
	getAllChats,
	getChat,
};

export { reducer } from "./chats.slice.js";
export { allAction as actions };
