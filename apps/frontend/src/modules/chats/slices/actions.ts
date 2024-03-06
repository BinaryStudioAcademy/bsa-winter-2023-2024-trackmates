import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { actions as appActions } from "~/libs/slices/app/app.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type ChatMessageItemResponseDto } from "~/modules/chat-messages/chat-messages.js";

import {
	type ChatGetAllItemResponseDto,
	type ChatItemResponseDto,
	type ChatSearchResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./chats.slice.js";

const ONE_UNREAD_MESSAGE = 1;

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
	ChatGetAllItemResponseDto[],
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

		return chats;
	}

	const updatedChats = chats.map((chat) => {
		if (chat.id !== newMessage.chatId) {
			return chat;
		}

		return {
			...chat,
			lastMessage: newMessage,
			unreadMessageCount:
				chat.interlocutor.id === newMessage.senderUser.id
					? Number(chat.unreadMessageCount) + ONE_UNREAD_MESSAGE
					: chat.unreadMessageCount,
		};
	});

	updatedChats.sort((a, b) => {
		return (
			new Date(b.lastMessage.createdAt).getTime() -
			new Date(a.lastMessage.createdAt).getTime()
		);
	});

	return updatedChats;
});

const addMessageToCurrentChat = createAsyncThunk<
	ChatItemResponseDto | null,
	ChatMessageItemResponseDto,
	AsyncThunkConfig
>(`${sliceName}/add-message-to-chat`, (newMessage, { dispatch, getState }) => {
	const {
		chats: { currentChat },
	} = getState();

	void dispatch(updateChats(newMessage));

	if (currentChat?.id !== newMessage.chatId) {
		return currentChat;
	}

	const [lastMessage] = currentChat.messages;

	const updatedMessages =
		lastMessage?.id === newMessage.id
			? currentChat.messages
			: [newMessage, ...currentChat.messages];

	return {
		...currentChat,
		messages: updatedMessages,
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
	joinRoom,
	leaveRoom,
	updateChats,
};
