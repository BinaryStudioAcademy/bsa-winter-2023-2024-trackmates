import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { ChatsApi } from "./chats-api.js";

const chatsApi = new ChatsApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export {
	DEFAULT_SEARCH_CHAT_PAYLOAD,
	SEARCH_CHAT_DELAY_MS,
} from "./libs/constants/constants.js";
export {
	type ChatGetAllItemResponseDto,
	type ChatItemResponseDto,
	type ChatSearchResponseDto,
} from "./libs/types/types.js";
export { chatsApi };
export { actions, reducer } from "./slices/chats.js";
