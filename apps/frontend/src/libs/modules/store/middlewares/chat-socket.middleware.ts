import {
	type Middleware,
	type PayloadAction,
	isAction,
} from "@reduxjs/toolkit";

import {
	SocketEvent,
	SocketNamespace,
	socket,
} from "~/libs/modules/socket/socket.js";
import { type AppDispatch } from "~/libs/types/types.js";
import { type ChatMessageItemResponseDto } from "~/modules/chat-messages/chat-messages.js";
import { actions as chatsActions } from "~/modules/chats/chats.js";

const chatSocketInstance = socket.getInstance(SocketNamespace.CHAT);

type SocketMiddlewareParameters = {
	dispatch: AppDispatch;
};

const chatSocket: Middleware = ({ dispatch }: SocketMiddlewareParameters) => {
	chatSocketInstance.on(
		SocketEvent.CHAT_ADD_NEW_MESSAGE,
		(message: ChatMessageItemResponseDto) => {
			void dispatch(chatsActions.addMessageToCurrentChat(message));
		},
	);

	return (next) => {
		return (action) => {
			if (isAction(action) && action.type === chatsActions.joinRoom.type) {
				chatSocketInstance.emit(
					SocketEvent.CHAT_JOIN_ROOM,
					(action as PayloadAction<string>).payload,
				);
			}

			if (isAction(action) && action.type === chatsActions.leaveRoom.type) {
				chatSocketInstance.emit(
					SocketEvent.CHAT_LEAVE_ROOM,
					(action as PayloadAction<string>).payload,
				);
			}

			return next(action);
		};
	};
};

export { chatSocket };
