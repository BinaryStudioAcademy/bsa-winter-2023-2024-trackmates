import { type Entity } from "~/libs/types/types.js";

import { FilesContentType } from "./libs/enums/files-content-type.enum.js";
import { type ValueOf } from "./libs/types/types.js";

class FileEntity implements Entity {
	private contentType: ValueOf<typeof FilesContentType>;

	private createdAt: string;

	private id: null | number;

	public updatedAt: string;

	public url: string;

	private constructor({
		contentType,
		createdAt,
		id,
		updatedAt,
		url,
	}: {
		contentType: ValueOf<typeof FilesContentType>;
		createdAt: string;
		id: null | number;
		updatedAt: string;
		url: string;
	}) {
		this.contentType = contentType;
		this.createdAt = createdAt;
		this.id = id;
		this.updatedAt = updatedAt;
		this.url = url;
	}

	public static initialize({
		contentType,
		createdAt,
		id,
		updatedAt,
		url,
	}: {
		contentType: ValueOf<typeof FilesContentType>;
		createdAt: string;
		id: null | number;
		updatedAt: string;
		url: string;
	}): FileEntity {
		return new FileEntity({
			contentType,
			createdAt,
			id,
			updatedAt,
			url,
		});
	}

	public static initializeNew({
		contentType,
		url,
	}: {
		contentType: ValueOf<typeof FilesContentType>;
		url: string;
	}): FileEntity {
		return new FileEntity({
			contentType,
			createdAt: "",
			id: null,
			updatedAt: "",
			url,
		});
	}

	public toNewObject(): {
		contentType: ValueOf<typeof FilesContentType>;
		createdAt: string;
		updatedAt: string;
		url: string;
	} {
		return {
			contentType: this.contentType,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			url: this.url,
		};
	}

	public toObject(): {
		contentType: ValueOf<typeof FilesContentType>;
		createdAt: string;
		id: number;
		updatedAt: string;
		url: string;
	} {
		return {
			contentType: this.contentType,
			createdAt: this.createdAt,
			id: this.id as number,
			updatedAt: this.updatedAt,
			url: this.url,
		};
	}
}

export { FileEntity };
