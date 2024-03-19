import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import {
	type PaginationRequestDto,
	type PaginationResponseDto,
} from "~/libs/types/types.js";

import { type UserAuthResponseDto } from "../auth/auth.js";
import { FriendsApiPath } from "./libs/enums/enums.js";
import {
	type FriendFollowRequestDto,
	type FriendFollowResponseDto,
	type FriendUnfollowRequestDto,
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

	public async follow(
		payload: FriendFollowRequestDto,
	): Promise<FriendFollowResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(FriendsApiPath.FOLLOW, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<FriendFollowResponseDto>();
	}

	public async getAllFollowingsIds(): Promise<number[]> {
		const response = await this.load(
			this.getFullEndpoint(FriendsApiPath.FOLLOWINGS_IDS, {}),
			{
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<number[]>();
	}

	public async getAllPotentialFriends(
		query: PaginationRequestDto,
	): Promise<PaginationResponseDto<UserAuthResponseDto>> {
		const response = await this.load(
			this.getFullEndpoint(FriendsApiPath.POTENTIAL_FOLLOWINGS, {}),
			{
				hasAuth: true,
				method: "GET",
				query,
			},
		);

		return await response.json<PaginationResponseDto<UserAuthResponseDto>>();
	}

	public async getFollowers(
		query: PaginationRequestDto,
	): Promise<PaginationResponseDto<UserAuthResponseDto>> {
		const response = await this.load(
			this.getFullEndpoint(FriendsApiPath.FOLLOWERS, {}),
			{
				hasAuth: true,
				method: "GET",
				query,
			},
		);

		return await response.json<PaginationResponseDto<UserAuthResponseDto>>();
	}

	public async getFollowings(
		query: PaginationRequestDto,
	): Promise<PaginationResponseDto<UserAuthResponseDto>> {
		const response = await this.load(
			this.getFullEndpoint(FriendsApiPath.FOLLOWINGS, {}),
			{
				hasAuth: true,
				method: "GET",
				query,
			},
		);

		return await response.json<PaginationResponseDto<UserAuthResponseDto>>();
	}

	public async getIsFollowing(id: number): Promise<boolean> {
		const response = await this.load(
			this.getFullEndpoint(FriendsApiPath.$ID_IS_FOLLOWING, {
				id: String(id),
			}),
			{
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<boolean>();
	}

	public async unfollow(payload: FriendUnfollowRequestDto): Promise<boolean> {
		const response = await this.load(
			this.getFullEndpoint(FriendsApiPath.UNFOLLOW, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "DELETE",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<boolean>();
	}
}

export { FriendsApi };
