import {
	addMessageToCurrentChat,
	createChat,
	getAllChats,
	getChat,
	getUnreadMessagesCount,
	joinRoom,
	leaveRoom,
	updateMessagesStatus,
} from "./actions.js";
import { actions } from "./chats.slice.js";

const allAction = {
	...actions,
	addMessageToCurrentChat,
	createChat,
	getAllChats,
	getChat,
	getUnreadMessagesCount,
	joinRoom,
	leaveRoom,
	updateMessagesStatus,
};

export { reducer } from "./chats.slice.js";
export { allAction as actions };
