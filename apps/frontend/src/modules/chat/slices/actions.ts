import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type ChatGetAllResponseDto,
	type MessageGetAllResponseDto,
	type MessageResponseDto,
	type MessageSendRequestDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./chat.slice.js";

const getAllChats = createAsyncThunk<
	ChatGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-all-chats`, async (_payload, { extra }) => {
	const { chatApi } = extra;

	return await chatApi.getAllChats();
});

const getAllMessages = createAsyncThunk<
	MessageGetAllResponseDto,
	string,
	AsyncThunkConfig
>(`${sliceName}/get-all-messages`, async (chatId, { extra }) => {
	const { chatApi } = extra;

	return await chatApi.getAllMessages(chatId);
});

const sendMessage = createAsyncThunk<
	MessageResponseDto,
	MessageSendRequestDto,
	AsyncThunkConfig
>(`${sliceName}/send-message`, async (messagePayload, { extra }) => {
	const { chatApi } = extra;

	return await chatApi.sendMessage(messagePayload);
});

export { getAllChats, getAllMessages, sendMessage };
