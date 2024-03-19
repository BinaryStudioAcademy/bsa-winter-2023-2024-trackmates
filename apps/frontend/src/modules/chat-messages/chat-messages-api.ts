import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { ChatMessagesApiPath } from "./libs/enums/enums.js";
import {
	type ChatMessageCreateRequestDto,
	type ChatMessageItemResponseDto,
	type ReadChatMessagesRequestDto,
	type ReadChatMessagesResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class ChatMessagesApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.CHAT_MESSAGES, storage });
	}

	public async sendMessage(
		payload: ChatMessageCreateRequestDto,
	): Promise<ChatMessageItemResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ChatMessagesApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<ChatMessageItemResponseDto>();
	}

	public async setReadChatMessages(
		payload: ReadChatMessagesRequestDto,
	): Promise<ReadChatMessagesResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ChatMessagesApiPath.READ_CHAT_MESSAGES, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<ReadChatMessagesResponseDto>();
	}
}

export { ChatMessagesApi };
