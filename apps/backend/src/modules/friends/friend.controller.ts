import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { UserAuthResponseDto } from "../users/users.js";
import {
	type FriendAddNewRequestDto,
	type FriendReplyRequestDto,
} from "./friend.js";
import { FriendService } from "./friend.service.js";
import { FriendApiPath } from "./libs/enums/enums.js";

class FriendController extends BaseController {
	private friendService: FriendService;

	public constructor(logger: Logger, friendService: FriendService) {
		super(logger, APIPath.FRIEND);

		this.friendService = friendService;

		this.addRoute({
			handler: (options) =>
				this.getUserFriends(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				),
			method: "GET",
			path: FriendApiPath.ROOT,
		});
		this.addRoute({
			handler: (options) =>
				this.sendRequest(
					options as APIHandlerOptions<{
						body: FriendAddNewRequestDto;
						user: UserAuthResponseDto;
					}>,
				),
			method: "POST",
			path: FriendApiPath.REQUEST,
		});
		this.addRoute({
			handler: (options) =>
				this.respondRequest(
					options as APIHandlerOptions<{
						body: FriendReplyRequestDto;
					}>,
				),
			method: "POST",
			path: FriendApiPath.REPLY,
		});
	}

	private async getUserFriends(
		options: APIHandlerOptions<{
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { id } = options.user;

		return {
			payload: await this.friendService.getUserFriends(id),
			status: HTTPCode.OK,
		};
	}

	private async respondRequest(
		options: APIHandlerOptions<{
			body: FriendReplyRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { id, isAccept } = options.body;

		return {
			payload: await this.friendService.respondRequest(id, isAccept),
			status: HTTPCode.OK,
		};
	}

	private async sendRequest(
		options: APIHandlerOptions<{
			body: FriendAddNewRequestDto;
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { id } = options.user;
		const { receiverUserId } = options.body;

		return {
			payload: await this.friendService.sendFriendRequest(id, receiverUserId),
			status: HTTPCode.OK,
		};
	}
}

export { FriendController };
