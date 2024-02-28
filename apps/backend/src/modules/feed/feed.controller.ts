import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type UserAuthResponseDto } from "../users/users.js";
import { type FeedService } from "./feed.service.js";
import { FeedApiPath } from "./libs/enums/enums.js";

class FeedController extends BaseController {
	private feedService: FeedService;

	public constructor(logger: Logger, feedService: FeedService) {
		super(logger, APIPath.FEED);

		this.feedService = feedService;

		this.addRoute({
			handler: (options) => {
				return this.getFeed(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "GET",
			path: FeedApiPath.ROOT,
		});
	}

	private async getFeed({
		user,
	}: APIHandlerOptions<{
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.feedService.getFeed(user.id),
			status: HTTPCode.OK,
		};
	}
}

export { FeedController };
