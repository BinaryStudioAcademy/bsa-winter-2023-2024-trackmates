import { file } from "~/libs/modules/file/file.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { userService } from "~/modules/users/users.js";

import { FileController } from "./file.controller.js";
import { FileModel } from "./file.model.js";
import { FileRepository } from "./file.repository.js";
import { FileService } from "./file.service.js";

const fileRepository = new FileRepository(FileModel);
const fileService = new FileService(file, fileRepository, userService);
const fileController = new FileController(logger, fileService);

export { fileController };
export { UploadedFile } from "./libs/types/types.js";
