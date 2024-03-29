import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/service.type.js";
import { type FileRepository } from "~/modules/files/file.repository.js";
import { type UserService } from "~/modules/users/users.js";

import { FileEntity } from "./file.entity.js";
import { FileError } from "./libs/exceptions/exceptions.js";
import {
	type FileUploadResponseDto,
	type UploadedFile,
} from "./libs/types/types.js";

type Constructor = {
	credentials: {
		accessKey: string;
		bucket: string;
		region: string;
		secretKey: string;
	};
	fileRepository: FileRepository;
	userService: UserService;
};

class FileService implements Service {
	private accessKey: string;
	private bucket: string;
	private fileRepository: FileRepository;
	private region: string;
	private secretKey: string;
	private userService: UserService;

	public constructor({
		credentials,
		fileRepository,
		userService,
	}: Constructor) {
		this.accessKey = credentials.accessKey;
		this.bucket = credentials.bucket;
		this.fileRepository = fileRepository;
		this.region = credentials.region;
		this.secretKey = credentials.secretKey;
		this.userService = userService;
	}

	private async upload(file: Buffer, fileName: string): Promise<string> {
		return await new Upload({
			client: new S3Client({
				credentials: {
					accessKeyId: this.accessKey,
					secretAccessKey: this.secretKey,
				},
				region: this.region,
			}),
			params: {
				ACL: "public-read",
				Body: file,
				Bucket: this.bucket,
				Key: `${Date.now().toString()}-${fileName}`,
			},
		})
			.done()
			.then((result) => {
				if (result.Location) {
					return result.Location;
				}

				throw new FileError({
					message: ExceptionMessage.UNKNOWN_ERROR,
					status: HTTPCode.INTERNAL_SERVER_ERROR,
				});
			});
	}

	public async create(
		uploadedFile: UploadedFile,
	): Promise<FileUploadResponseDto> {
		const { buffer, contentType, fileName } = uploadedFile;
		const url = await this.upload(buffer, fileName);
		const file = await this.fileRepository.create(
			FileEntity.initializeNew({ contentType, url }),
		);

		return file.toObject();
	}

	public async delete(fileId: number): Promise<boolean> {
		const file = await this.fileRepository.find(fileId);

		if (!file) {
			throw new FileError({
				message: ExceptionMessage.FILE_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return await this.fileRepository.delete(fileId);
	}

	public async find(fileId: number): Promise<FileEntity> {
		const file = await this.fileRepository.find(fileId);

		if (!file) {
			throw new FileError({
				message: ExceptionMessage.FILE_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return file;
	}

	public async findAll(): Promise<{ items: FileEntity[] }> {
		const { items } = await this.fileRepository.findAll();

		return { items };
	}

	public async update(
		fileId: number,
		payload: Partial<FileEntity>,
	): Promise<FileEntity> {
		const file = await this.fileRepository.find(fileId);

		if (!file) {
			throw new FileError({
				message: ExceptionMessage.FILE_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return await this.fileRepository.update(fileId, payload);
	}

	public async uploadAvatar(
		userId: number,
		uploadedFile: UploadedFile,
	): Promise<FileUploadResponseDto> {
		const { buffer, contentType, fileName } = uploadedFile;
		const url = await this.upload(buffer, fileName);
		const file = await this.fileRepository.create(
			FileEntity.initializeNew({ contentType, url }),
		);
		const createdFile = file.toObject();
		await this.userService.addAvatar(userId, createdFile.id);

		return createdFile;
	}
}

export { FileService };
