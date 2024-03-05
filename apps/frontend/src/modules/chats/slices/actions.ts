import { createAsyncThunk } from "@reduxjs/toolkit";

import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { actions as appActions } from "~/libs/slices/app/app.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { actions as chatMessagesAction } from "~/modules/chat-messages/chat-messages.js";

import {
	type ChatGetAllItemResponseDto,
	type ChatItemResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./chats.slice.js";

const getAllChats = createAsyncThunk<
	{ items: ChatGetAllItemResponseDto[] },
	{
		search: string;
	},
	AsyncThunkConfig
>(`${sliceName}/get-all-chats`, async (getAllChatsPayload, { extra }) => {
	const { chatsApi } = extra;

	return await chatsApi.getAllChats(getAllChatsPayload);
});

const getChat = createAsyncThunk<ChatItemResponseDto, number, AsyncThunkConfig>(
	`${sliceName}/get-chat`,
	async (chatId, { dispatch, extra }) => {
		const { chatsApi } = extra;

		const newChat = await chatsApi.getChat(chatId);
		dispatch(chatMessagesAction.updateMessages(newChat.messages));

		return newChat;
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
	void dispatch(getAllChats({ search: "" }));
	dispatch(chatMessagesAction.updateMessages(newChat.messages));

	return newChat;
});

export { createChat, getAllChats, getChat };
