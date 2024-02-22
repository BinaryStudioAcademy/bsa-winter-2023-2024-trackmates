import { type Repository } from "~/libs/types/types.js";

import { FileEntity } from "./file.entity.js";
import { type FileModel } from "./file.model.js";

class FileRepository implements Repository<FileEntity> {
	private fileModel: typeof FileModel;

	public constructor(fileModel: typeof FileModel) {
		this.fileModel = fileModel;
	}

	public async create(file: FileEntity): Promise<FileEntity> {
		const { contentType, url } = file.toNewObject();

		const createdFile = await this.fileModel
			.query()
			.insert({ contentType, url })
			.returning("*")
			.execute();

		return FileEntity.initialize({
			contentType: createdFile.contentType,
			createdAt: createdFile.createdAt,
			id: createdFile.id,
			updatedAt: createdFile.updatedAt,
			url: createdFile.url,
		});
	}

	public async delete(fileId: number): Promise<boolean> {
		return Boolean(await this.fileModel.query().deleteById(fileId).execute());
	}

	public async find(fileId: number): Promise<FileEntity | null> {
		const file = await this.fileModel.query().findById(fileId);

		return file ? FileEntity.initialize(file) : null;
	}

	public async findAll(): Promise<FileEntity[]> {
		return await this.fileModel.query().castTo<FileEntity[]>().execute();
	}

	public async update(
		fileId: number,
		payload: Partial<FileEntity>,
	): Promise<FileEntity> {
		return await this.fileModel
			.query()
			.patchAndFetchById(fileId, payload)
			.castTo<FileEntity>()
			.execute();
	}
}

export { FileRepository };
