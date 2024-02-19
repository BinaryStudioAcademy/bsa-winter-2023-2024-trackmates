import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type FriendResponseDto } from "~/libs/types/types.js";

import { type UserAuthResponseDto } from "../auth/auth.js";
import { FriendsApiPath } from "./libs/enums/enums.js";
import {
	type FriendAddNewRequestDto,
	type FriendAddNewResponseDto,
	type FriendReplyRequestDto,
	type FriendReplyResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class FriendsApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.FRIENDS, storage });
	}

	public async getAllFriends(): Promise<FriendResponseDto[]> {
		const response = await this.load(
			this.getFullEndpoint(FriendsApiPath.ROOT, {}),
			{
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<FriendResponseDto[]>();
	}

	public async getAllPotentialFriends(): Promise<UserAuthResponseDto[]> {
		const response = await this.load(
			this.getFullEndpoint(FriendsApiPath.GET_POTENTIAL_FRIENDS, {}),
			{
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<UserAuthResponseDto[]>();
	}

	public async replyToRequest(
		payload: FriendReplyRequestDto,
	): Promise<FriendReplyResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(FriendsApiPath.REPLY, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<FriendReplyResponseDto>();
	}

	public async sendRequest(
		payload: FriendAddNewRequestDto,
	): Promise<FriendAddNewResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(FriendsApiPath.REQUEST, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<FriendAddNewResponseDto>();
	}
}

export { FriendsApi };
