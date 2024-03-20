import { config } from "~/libs/modules/config/config.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { userService } from "~/modules/users/users.js";

import { FileController } from "./file.controller.js";
import { FileModel } from "./file.model.js";
import { FileRepository } from "./file.repository.js";
import { FileService } from "./file.service.js";

const fileRepository = new FileRepository(FileModel);
const fileService = new FileService({
	credentials: {
		accessKeyId: config.ENV.AWS.AWS_ACCESS_KEY_ID,
		bucket: config.ENV.AWS.S3_BUCKET,
		region: config.ENV.AWS.S3_REGION,
		secretAccessKey: config.ENV.AWS.AWS_SECRET_ACCESS_KEY,
	},
	fileRepository,
	userService,
});
const fileController = new FileController(logger, fileService);

export { fileController };
export { FileError } from "./libs/exceptions/exceptions.js";
export { type UploadedFile } from "./libs/types/types.js";
