import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { ChatsApiPath } from "./libs/enums/enums.js";
import {
	type ChatCreateRequestDto,
	type ChatGetAllItemResponseDto,
	type ChatItemResponseDto,
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

	public async createChat(
		payload: ChatCreateRequestDto,
	): Promise<ChatItemResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ChatsApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<ChatItemResponseDto>();
	}

	public async getAllChats({
		search,
	}: {
		search: string;
	}): Promise<{ items: ChatGetAllItemResponseDto[] }> {
		const response = await this.load(
			this.getFullEndpoint(ChatsApiPath.ROOT, {}),
			{
				hasAuth: true,
				method: "GET",
				query: {
					search,
				},
			},
		);

		return await response.json<{ items: ChatGetAllItemResponseDto[] }>();
	}

	public async getChat(chatId: number): Promise<ChatItemResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ChatsApiPath.$CHAT_ID, { chatId: String(chatId) }),
			{ hasAuth: true, method: "GET" },
		);

		return await response.json<ChatItemResponseDto>();
	}

	public async getUnreadMessagesCount(): Promise<number> {
		const response = await this.load(
			this.getFullEndpoint(ChatsApiPath.UNREAD_COUNT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<number>();
	}
}

export { ChatsApi };
