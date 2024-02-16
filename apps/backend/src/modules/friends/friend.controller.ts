import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { FriendService } from "./friend.service.js";
import { FriendApiPath } from "./libs/enums/enums.js";

class FriendController extends BaseController {
	private friendService: FriendService;

	public constructor(logger: Logger, friendService: FriendService) {
		super(logger, APIPath.FRIEND);

		this.friendService = friendService;

		this.addRoute({
			handler: (options) =>
				this.sendRequest(
					options as APIHandlerOptions<{
						body: {
							recipientUserId: number;
							senderUserId: number;
						};
					}>,
				),
			method: "POST",
			path: FriendApiPath.REQUEST,
		});
		this.addRoute({
			handler: (options) =>
				this.respondRequest(
					options as APIHandlerOptions<{
						body: {
							id: number;
							isAccept: boolean;
						};
					}>,
				),
			method: "POST",
			path: FriendApiPath.REPLY,
		});
	}

	private async respondRequest(
		options: APIHandlerOptions<{
			body: {
				id: number;
				isAccept: boolean;
			};
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
			body: {
				recipientUserId: number;
				senderUserId: number;
			};
		}>,
	): Promise<APIHandlerResponse> {
		const { recipientUserId, senderUserId } = options.body;

		return {
			payload: await this.friendService.sendFriendRequest(
				senderUserId,
				recipientUserId,
			),
			status: HTTPCode.OK,
		};
	}
}

export { FriendController };
