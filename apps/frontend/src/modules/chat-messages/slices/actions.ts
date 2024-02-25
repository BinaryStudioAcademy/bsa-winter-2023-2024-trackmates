import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type MessageItemResponseDto,
	type MessageCreateRequestDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./chat-messages.slice.js";

const sendMessage = createAsyncThunk<
	MessageItemResponseDto,
	MessageCreateRequestDto,
	AsyncThunkConfig
>(`${sliceName}/send-message`, async (messagePayload, { dispatch, extra }) => {
	const { chatMessagesApi } = extra;

	return await chatMessagesApi.sendMessage(messagePayload);
});

export { sendMessage };
