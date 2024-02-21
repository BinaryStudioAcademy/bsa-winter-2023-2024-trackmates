import { config } from "~/libs/modules/config/config.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { userService } from "~/modules/users/users.js";

import { FileController } from "./file.controller.js";
import { FileModel } from "./file.model.js";
import { File } from "./file.module.js";
import { FileRepository } from "./file.repository.js";
import { FileService } from "./file.service.js";

const fileModule = new File({
	accessKeyId: config.ENV.AWS_S3.AWS_ACCESS_KEY_ID,
	bucket: config.ENV.AWS_S3.S3_BUCKET,
	region: config.ENV.AWS_S3.S3_REGION,
	secretAccessKey: config.ENV.AWS_S3.AWS_SECRET_ACCESS_KEY,
});
const fileRepository = new FileRepository(FileModel);
const fileService = new FileService(fileModule, fileRepository, userService);
const fileController = new FileController(logger, fileService);

export { fileController };
export { type UploadedFile } from "./libs/types/types.js";
