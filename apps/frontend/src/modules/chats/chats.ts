import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { ChatsApi } from "./chats-api.js";

const chatsApi = new ChatsApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { type ChatGetAllItemResponseDto } from "./libs/types/types.js";

export { chatsApi };
export { actions, reducer } from "./slices/chats.js";
