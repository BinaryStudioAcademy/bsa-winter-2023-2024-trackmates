import { ExceptionMessage } from "~/libs/enums/enums.js";
import {
	APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type FileService } from "~/modules/files/file.service.js";

import { APIPath, FilesApiPath } from "./libs/enums/enums.js";
import { FileError } from "./libs/exceptions/exceptions.js";
import {
	type UploadedFile,
	type UserAuthResponseDto,
} from "./libs/types/types.js";

/***
 * @swagger
 * components:
 *    schemas:
 *      File:
 *        type: object
 *        properties:
 *          contentType:
 *            type: string
 *          url:
 *            type: string
 */
class FileController extends BaseController {
	private fileService: FileService;

	constructor(logger: Logger, fileService: FileService) {
		super(logger, APIPath.FILES);

		this.fileService = fileService;

		this.addRoute({
			handler: (options) =>
				this.uploadAvatar(
					options as APIHandlerOptions<{
						uploadedFile: UploadedFile | null;
						user: UserAuthResponseDto;
					}>,
				),
			method: "POST",
			path: FilesApiPath.UPLOAD_AVATAR,
		});
	}

	/**
	 * @swagger
	 * /files/upload-avatar:
	 *    post:
	 *      description: Uploads user's avatar
	 *      requestBody:
	 *        description: Image for uploading
	 *        required: true
	 *        content:
	 *          multipart/form-data:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                file:
	 *                  type: string
	 *                  format: binary
	 *      responses:
	 *        200:
	 *          description: File uploaded successfully
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  file:
	 *                    type: object
	 *                    $ref: "#/components/schemas/File"
	 *        400:
	 *          description: Bad request file was not provided
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  errorType:
	 *                    type: string
	 *                  message:
	 *                    type: string
	 *        500:
	 *          description: Unkown error, failed upload on aws s3
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  errorType:
	 *                    type: string
	 *                  message:
	 *                    type: string
	 */
	async uploadAvatar(
		options: APIHandlerOptions<{
			uploadedFile: UploadedFile | null;
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		if (!options.uploadedFile) {
			throw new FileError({
				message: ExceptionMessage.NO_FILE_PRESENTED,
				status: HTTPCode.BAD_REQUEST,
			});
		}
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
