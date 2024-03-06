import {
	addMessageToCurrentChat,
	createChat,
	getAllChats,
	getChat,
	joinRoom,
	leaveRoom,
} from "./actions.js";
import { actions } from "./chats.slice.js";

const allAction = {
	...actions,
	addMessageToCurrentChat,
	createChat,
	getAllChats,
	getChat,
	joinRoom,
	leaveRoom,
};

export { reducer } from "./chats.slice.js";
export { allAction as actions };
