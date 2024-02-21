import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { ChatMessageApiPath } from "./libs/enums/enums.js";
import {
	type ChatGetAllResponseDto,
	type MessageGetAllResponseDto,
	type MessageResponseDto,
	type MessageSendRequestDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class ChatMessageApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.CHAT, storage });
	}

	public async getAllChats(): Promise<ChatGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ChatMessageApiPath.ROOT, {}),
			{
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<ChatGetAllResponseDto>();
	}

	public async getAllMessages(
		chatId: string,
	): Promise<MessageGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ChatMessageApiPath.$CHAT_ID, { chatId }),
			{ hasAuth: true, method: "GET" },
		);

		return await response.json<MessageGetAllResponseDto>();
	}

	public async sendMessage(
		payload: MessageSendRequestDto,
	): Promise<MessageResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ChatMessageApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<MessageResponseDto>();
	}
}

export { ChatMessageApi };
