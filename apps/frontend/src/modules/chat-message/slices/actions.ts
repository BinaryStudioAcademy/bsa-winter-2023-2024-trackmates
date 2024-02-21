import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type ChatGetAllResponseDto,
	type MessageGetAllResponseDto,
	type MessageResponseDto,
	type MessageSendRequestDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./chat-message.slice.js";

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
>(`${sliceName}/send-message`, async (messagePayload, { extra }) => {
	const { chatMessageApi } = extra;

	return await chatMessageApi.sendMessage(messagePayload);
});

export { getAllChats, getAllMessages, sendMessage };
