import { createAsyncThunk } from "@reduxjs/toolkit";

import { AppRoute } from "~/libs/enums/enums.js";
import { configureString, createQueryLink } from "~/libs/helpers/helpers.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { actions as appActions } from "~/modules/app/app.js";

import {
	type ChatGetAllResponseDto,
	type MessageGetAllResponseDto,
	type MessageResponseDto,
	type MessageSendRequestDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./chat-message.slice.js";

const createChat = createAsyncThunk<
	MessageResponseDto,
	MessageSendRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create-chat`, async (messagePayload, { dispatch, extra }) => {
	const { chatMessageApi } = extra;

	const newChatMessage = await chatMessageApi.sendMessage(messagePayload);

	const chatId = newChatMessage.chatId;
	const userId = newChatMessage.receiverUser.id;
	const newChatRouteById = configureString(AppRoute.CHATS_$ID, {
		id: String(chatId),
	}) as typeof AppRoute.CHATS_$ID;
	const chatRouteWithUser = createQueryLink(
		newChatRouteById,
		"user",
		String(userId),
	) as typeof AppRoute.CHATS_$ID;

	void dispatch(appActions.navigate(chatRouteWithUser));
	void dispatch(getAllMessages(newChatMessage.chatId));

	return newChatMessage;
});

const getAllChats = createAsyncThunk<
	ChatGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-all-chats`, async (_payload, { extra }) => {
	const { chatMessageApi } = extra;

	return await chatMessageApi.getAllChats();
});

const getAllMessages = createAsyncThunk<
	MessageGetAllResponseDto,
	string,
	AsyncThunkConfig
>(`${sliceName}/get-all-messages`, async (chatId, { extra }) => {
	const { chatMessageApi } = extra;

	return await chatMessageApi.getAllMessages(chatId);
});

const sendMessage = createAsyncThunk<
	MessageResponseDto,
	MessageSendRequestDto,
	AsyncThunkConfig
>(`${sliceName}/send-message`, async (messagePayload, { dispatch, extra }) => {
	const { chatMessageApi } = extra;

	const newChatMessage = await chatMessageApi.sendMessage(messagePayload);

	void dispatch(getAllMessages(newChatMessage.chatId));

	return newChatMessage;
});

export { createChat, getAllChats, getAllMessages, sendMessage };
