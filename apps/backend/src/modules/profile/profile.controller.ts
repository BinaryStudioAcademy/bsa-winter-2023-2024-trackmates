import { MultipartFile } from "@fastify/multipart";

import {
	APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { Logger } from "~/libs/modules/logger/logger.js";
import { ProfileService } from "~/modules/profile/profile.service.js";

import { APIPath, ProfileApiPath } from "./libs/enums/enums.js";

class ProfileController extends BaseController {
	private profileService: ProfileService;

	constructor(logger: Logger, profileService: ProfileService) {
		super(logger, APIPath.PROFILE);

		this.profileService = profileService;

		this.addRoute({
			handler: (options) =>
				this.uploadAvatar(
					options as APIHandlerOptions<{ uploadedFile: MultipartFile | null }>,
				),
			method: "POST",
			path: ProfileApiPath.UPLOAD,
		});
	}

	async uploadAvatar(options: APIHandlerOptions): Promise<APIHandlerResponse> {
		return {
			payload: await this.profileService.uploadAvatar(
				options.uploadedFile as MultipartFile,
			),
			status: HTTPCode.OK,
		};
	}
}

export { ProfileController };
