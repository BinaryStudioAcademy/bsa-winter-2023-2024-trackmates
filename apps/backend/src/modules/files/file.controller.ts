import { UserAuthResponseDto } from "shared";

import {
	APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type FileService } from "~/modules/files/file.service.js";

import { APIPath, FilesApiPath } from "./libs/enums/enums.js";
import { UploadedFile } from "./libs/types/types.js";

class FileController extends BaseController {
	private fileService: FileService;

	constructor(logger: Logger, fileService: FileService) {
		super(logger, APIPath.FILES);

		this.fileService = fileService;

		this.addRoute({
			handler: (options) =>
				this.uploadAvatar(
					options as APIHandlerOptions<{
						uploadedFile: UploadedFile;
						user: UserAuthResponseDto;
					}>,
				),
			method: "POST",
			path: FilesApiPath.UPLOAD,
		});
	}

	async uploadAvatar(
		options: APIHandlerOptions<{
			uploadedFile: UploadedFile;
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.fileService.uploadAvatar(
				options.user.id,
				options.uploadedFile,
			),
			status: HTTPCode.OK,
		};
	}
}

export { FileController };
