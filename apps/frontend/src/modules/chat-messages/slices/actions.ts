import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { actions as chatsActions } from "~/modules/chats/chats.js";

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
>(`${sliceName}/send-message`, async (messagePayload, { dispatch, extra }) => {
	const { chatMessagesApi } = extra;

	const newMessage = await chatMessagesApi.sendMessage(messagePayload);

	void dispatch(chatsActions.addMessageToCurrentChat(newMessage));

	return newMessage;
});

const setReadChatMessages = createAsyncThunk<
	ReadChatMessagesResponseDto,
	ReadChatMessagesRequestDto,
	AsyncThunkConfig
>(
	`${sliceName}/set-read-chat-messages`,
	async (messagePayload, { dispatch, extra }) => {
		const { chatMessagesApi } = extra;

		const updatedMessages =
			await chatMessagesApi.setReadChatMessages(messagePayload);

		void dispatch(chatsActions.updateReadChatMessages(updatedMessages));

		return updatedMessages;
	},
);

export { sendMessage, setReadChatMessages };
