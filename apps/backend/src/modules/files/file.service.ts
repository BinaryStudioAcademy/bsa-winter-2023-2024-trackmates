import { type File } from "~/libs/modules/file/file.js";
import { type Service } from "~/libs/types/service.type.js";
import { type FileRepository } from "~/modules/files/file.repository.js";
import { type UserService } from "~/modules/users/users.js";

import { FileEntity } from "./file.entity.js";
import { type AvatarUploadResponseDto } from "./libs/types/types.js";

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

	create(payload: unknown): Promise<unknown> {
		return Promise.resolve(payload);
	}
	delete(): Promise<boolean> {
		return Promise.resolve(true);
	}
	find(): Promise<null> {
		return Promise.resolve(null);
	}
	findAll(): Promise<{ items: [] }> {
		return Promise.resolve({ items: [] });
	}
	update(): Promise<null> {
		return Promise.resolve(null);
	}
	async uploadAvatar(
		userId: number,
		uploadedFile: {
			buffer: Buffer;
			contentType: string;
			fileName: string;
		},
	): Promise<AvatarUploadResponseDto> {
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
