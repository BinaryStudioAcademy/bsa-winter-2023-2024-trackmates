import { ExceptionMessage } from "~/libs/enums/enums.js";
import { type File } from "~/libs/modules/file/file.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/service.type.js";
import { type FileRepository } from "~/modules/files/file.repository.js";
import { type UserService } from "~/modules/users/users.js";

import { FileEntity } from "./file.entity.js";
import {
	type FileUploadResponseDto,
	type UploadedFile,
} from "./libs/types/types.js";

class FileService implements Service {
	private file: File;
	private fileRepository: FileRepository;
	private userService: UserService;

	constructor(
		file: File,
		fileRepository: FileRepository,
		userService: UserService,
	) {
		this.file = file;
		this.fileRepository = fileRepository;
		this.userService = userService;
	}

	async create(uploadedFile: UploadedFile): Promise<FileUploadResponseDto> {
		const { buffer, contentType, fileName } = uploadedFile;
		const url = await this.file.upload(buffer, fileName);
		const file = await this.fileRepository.create(
			FileEntity.initializeNew({ contentType, url }),
		);
		return file.toObject();
	}

	async delete(fileId: number): Promise<number> {
		const file = await this.fileRepository.find(fileId);
		if (!file) {
			throw new HTTPError({
				message: ExceptionMessage.FILE_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}
		return await this.fileRepository.delete(fileId);
	}

	async find(fileId: number): Promise<FileEntity> {
		const file = await this.fileRepository.find(fileId);
		if (!file) {
			throw new HTTPError({
				message: ExceptionMessage.FILE_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}
		return file;
	}

	async findAll(): Promise<FileEntity[]> {
		return await this.fileRepository.findAll();
	}

	async update(
		fileId: number,
		partialFile: Partial<FileEntity>,
	): Promise<FileEntity> {
		const file = await this.fileRepository.find(fileId);
		if (!file) {
			throw new HTTPError({
				message: ExceptionMessage.FILE_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}
		return await this.fileRepository.update(fileId, partialFile);
	}

	async uploadAvatar(
		userId: number,
		uploadedFile: UploadedFile,
	): Promise<FileUploadResponseDto> {
		const { buffer, contentType, fileName } = uploadedFile;
		const url = await this.file.upload(buffer, fileName);
		const file = await this.fileRepository.create(
			FileEntity.initializeNew({ contentType, url }),
		);
		const createdFile = file.toObject();
		await this.userService.addAvatar(userId, createdFile.id);
		return createdFile;
	}
}

export { FileService };
