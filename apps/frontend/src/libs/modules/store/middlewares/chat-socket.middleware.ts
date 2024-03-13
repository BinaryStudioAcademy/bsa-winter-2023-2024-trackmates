import {
	type Middleware,
	type PayloadAction,
	isAction,
} from "@reduxjs/toolkit";

import { SocketEvent, SocketNamespace } from "~/libs/modules/socket/socket.js";
import { type ExtraArguments } from "~/libs/modules/store/store.js";
import { type AppDispatch, type RootState } from "~/libs/types/types.js";
import { type ChatMessageItemResponseDto } from "~/modules/chat-messages/chat-messages.js";
import { actions as chatsActions } from "~/modules/chats/chats.js";

const chatSocket = ({
	extra: { socket },
}: {
	extra: ExtraArguments;
}): Middleware<unknown, RootState, AppDispatch> => {
	const chatSocketInstance = socket.getInstance(SocketNamespace.CHAT);

	return ({ dispatch }) => {
		chatSocketInstance.on(
			SocketEvent.CHAT_ADD_NEW_MESSAGE,
			(message: ChatMessageItemResponseDto) => {
				void dispatch(chatsActions.addMessageToCurrentChat(message));
				void dispatch(chatsActions.getUnreadMessagesCount());
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
};

export { chatSocket };
