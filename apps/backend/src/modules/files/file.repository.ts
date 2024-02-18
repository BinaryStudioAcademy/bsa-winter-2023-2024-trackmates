import { type Repository } from "~/libs/types/types.js";

import { FileEntity } from "./file.entity.js";
import { FileModel } from "./file.model.js";

class FileRepository implements Repository<FileEntity> {
	private fileModel: typeof FileModel;

	constructor(fileModel: typeof FileModel) {
		this.fileModel = fileModel;
	}

	async create(file: FileEntity): Promise<FileEntity> {
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
	delete(): Promise<boolean> {
		return Promise.resolve(true);
	}
	find(): Promise<null> {
		return Promise.resolve(null);
	}
	findAll(): Promise<FileEntity[]> {
		return Promise.resolve([]);
	}
	update(): Promise<null> {
		return Promise.resolve(null);
	}
}

export { FileRepository };
