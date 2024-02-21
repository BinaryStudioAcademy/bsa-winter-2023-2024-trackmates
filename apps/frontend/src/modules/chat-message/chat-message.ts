import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { ChatMessageApi } from "./chat-message-api.js";

const chatMessageApi = new ChatMessageApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export {
	type ChatItemResponseDto,
	type MessageResponseDto,
	type MessageSendRequestDto,
} from "./libs/types/types.js";

export { chatMessageApi };
export { actions, reducer } from "./slices/chat-message.js";
