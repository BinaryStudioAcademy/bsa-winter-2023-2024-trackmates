import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type ChatMessageCreateRequestDto,
	type ChatMessageItemResponseDto,
	type ReadChatMessagesRequestDto,
	type ReadChatMessagesResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./chat-messages.slice.js";

const sendMessage = createAsyncThunk<
	ChatMessageItemResponseDto,
	ChatMessageCreateRequestDto,
	AsyncThunkConfig
>(`${sliceName}/send-message`, async (messagePayload, { extra }) => {
	const { chatMessagesApi } = extra;

	return await chatMessagesApi.sendMessage(messagePayload);
});

const setReadChatMessages = createAsyncThunk<
	ReadChatMessagesResponseDto,
	ReadChatMessagesRequestDto,
	AsyncThunkConfig
>(`${sliceName}/set-read-chat-messages`, async (messagePayload, { extra }) => {
	const { chatMessagesApi } = extra;

	return await chatMessagesApi.setReadChatMessages(messagePayload);
});

export { sendMessage, setReadChatMessages };
