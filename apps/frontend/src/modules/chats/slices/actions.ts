import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { NotificationMessage } from "~/libs/modules/notification/notification.js";
import { actions as appActions } from "~/libs/slices/app/app.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type ChatMessageItemResponseDto } from "~/modules/chat-messages/chat-messages.js";

import {
	type ChatGetAllItemResponseDto,
	type ChatItemResponseDto,
	type ChatSearchResponseDto,
	type ReadChatMessagesResponseDto,
} from "../libs/types/types.js";
import { actions, name as sliceName } from "./chats.slice.js";

const getAllChats = createAsyncThunk<
	{ items: ChatGetAllItemResponseDto[] },
	ChatSearchResponseDto,
	AsyncThunkConfig
>(`${sliceName}/get-all-chats`, async (getAllChatsPayload, { extra }) => {
	const { chatsApi } = extra;

	return await chatsApi.getAllChats(getAllChatsPayload);
});

const getChat = createAsyncThunk<ChatItemResponseDto, number, AsyncThunkConfig>(
	`${sliceName}/get-chat`,
	async (chatId, { extra }) => {
		const { chatsApi } = extra;

		return await chatsApi.getChat(chatId);
	},
);

const createChat = createAsyncThunk<
	ChatItemResponseDto,
	number,
	AsyncThunkConfig
>(`${sliceName}/create-chat`, async (userId, { dispatch, extra }) => {
	const { chatsApi } = extra;

	const newChat = await chatsApi.createChat({ userId });
	const newChatRouteById = configureString(AppRoute.CHATS_$ID, {
		id: String(newChat.id),
	}) as typeof AppRoute.CHATS_$ID;

	void dispatch(appActions.navigate(newChatRouteById));

	return newChat;
});

const updateChats = createAsyncThunk<
	ChatMessageItemResponseDto,
	ChatMessageItemResponseDto,
	AsyncThunkConfig
>(`${sliceName}/update-chats`, (newMessage, { dispatch, getState }) => {
	const {
		chats: { chats },
	} = getState();

	const isMessageFromExistingChat = chats.some(
		(chat) => chat.id === newMessage.chatId,
	);

	if (!isMessageFromExistingChat) {
		void dispatch(getAllChats({ search: "" }));
	}

	return newMessage;
});

const addMessageToCurrentChat = createAsyncThunk<
	{ isMessageInCurrentChat: boolean; newMessage: ChatMessageItemResponseDto },
	ChatMessageItemResponseDto,
	AsyncThunkConfig
>(
	`${sliceName}/add-message-to-chat`,
	(newMessage, { dispatch, extra, getState }) => {
		const { notification } = extra;
		const {
			auth: { user },
			chats: { currentChat },
		} = getState();

		const { firstName, id, lastName } = newMessage.senderUser;

		const isSameUser = id === user?.id;
		const isMessageInCurrentChat = currentChat?.id === newMessage.chatId;

		if (!isSameUser) {
			void dispatch(actions.increaseUnreadMessageCount());
		}

		void dispatch(updateChats(newMessage));

		if (!isMessageInCurrentChat && !isSameUser) {
			notification.info(
				`${firstName} ${lastName} ${NotificationMessage.NEW_MESSAGE}`,
			);
		}

		return {
			isMessageInCurrentChat,
			newMessage,
		};
	},
);

const getUnreadMessagesCount = createAsyncThunk<
	number,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-unread-messages-count`, (_, { extra }) => {
	const { chatsApi } = extra;

	return chatsApi.getUnreadMessagesCount();
});

const updateMessagesStatus = createAsyncThunk<
	ReadChatMessagesResponseDto & { isUpdateUnreadCounts: boolean },
	ReadChatMessagesResponseDto,
	AsyncThunkConfig
>(`${sliceName}/update-message-status`, (payload, { getState }) => {
	const {
		auth: { user },
	} = getState();

	const isSameUserReads = user?.id === payload.readerId;

	return {
		...payload,
		isUpdateUnreadCounts: isSameUserReads,
	};
});

const joinRoom = createAction(`${sliceName}/join-room`, (userId: string) => {
	return {
		payload: userId,
	};
});

const leaveRoom = createAction(`${sliceName}/leave-room`, (userId: string) => {
	return {
		payload: userId,
	};
});

export {
	addMessageToCurrentChat,
	createChat,
	getAllChats,
	getChat,
	getUnreadMessagesCount,
	joinRoom,
	leaveRoom,
	updateChats,
	updateMessagesStatus,
};
