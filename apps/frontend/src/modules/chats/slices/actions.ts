import { createAsyncThunk } from "@reduxjs/toolkit";

import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { actions as appActions } from "~/modules/app/app.js";
import { actions as chatMessagesAction } from "~/modules/chat-messages/chat-messages.js";

import {
	type ChatGetAllResponseDto,
	type ChatSingleItemResponseDto,
} from "../libs/types/types.js";

import { name as sliceName } from "./chats.slice.js";

const getAllChats = createAsyncThunk<
	ChatGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-chats`, async (_payload, { extra }) => {
	const { chatsApi } = extra;

	return await chatsApi.getAllChats();
});

const getChat = createAsyncThunk<
	ChatSingleItemResponseDto,
	number,
	AsyncThunkConfig
>(`${sliceName}/get-chat`, async (chatId, { dispatch, extra }) => {
	const { chatsApi } = extra;

	const newChat = await chatsApi.getChat(chatId);
	dispatch(chatMessagesAction.updateMessages(newChat.messages));

	return newChat;
});

const createChat = createAsyncThunk<
	ChatSingleItemResponseDto,
	number,
	AsyncThunkConfig
>(`${sliceName}/get-chat`, async (userId, { dispatch, extra }) => {
	const { chatsApi } = extra;

	const newChat = await chatsApi.createChat({ userId });
	const newChatRouteById = configureString(AppRoute.CHATS_$ID, {
		id: String(newChat.chatId),
	}) as typeof AppRoute.CHATS_$ID;

	void dispatch(appActions.navigate(newChatRouteById));
	void dispatch(getAllChats());
	dispatch(chatMessagesAction.updateMessages(newChat.messages));

	return newChat;
});

export { createChat, getAllChats, getChat };
