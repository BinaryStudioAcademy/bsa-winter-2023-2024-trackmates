import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { ChatsApiPath } from "./libs/enums/enums.js";
import {
	type ChatCreateRequestDto,
	type ChatGetAllResponseDto,
	type ChatSingleItemResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class ChatsApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.CHATS, storage });
	}

	public async getAllChats(): Promise<ChatGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ChatsApiPath.ROOT, {}),
			{
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<ChatGetAllResponseDto>();
	}

	public async getChat(chatId: number): Promise<ChatSingleItemResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ChatsApiPath.$CHAT_ID, { chatId: String(chatId) }),
			{ hasAuth: true, method: "GET" },
		);

		return await response.json<ChatSingleItemResponseDto>();
	}

	public async createChat(
		payload: ChatCreateRequestDto,
	): Promise<ChatSingleItemResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ChatsApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<ChatSingleItemResponseDto>();
	}
}

export { ChatsApi };
