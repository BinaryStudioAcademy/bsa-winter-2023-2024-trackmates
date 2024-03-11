import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { ChatMessagesApi } from "./chat-messages-api.js";

const chatMessagesApi = new ChatMessagesApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { MessageStatus } from "./libs/enums/enums.js";
export {
	type ChatMessageCreateRequestDto,
	type ChatMessageItemResponseDto,
} from "./libs/types/types.js";
export { chatMessageValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
export { chatMessagesApi };
export { actions, reducer } from "./slices/chat-messages.js";
