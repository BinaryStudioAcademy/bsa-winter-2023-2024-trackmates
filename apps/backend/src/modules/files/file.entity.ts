import { type Entity } from "~/libs/types/types.js";

class FileEntity implements Entity {
	private contentType: string;

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
		contentType: string;
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
		contentType: string;
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
		contentType: string;
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
		contentType: string;
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
		contentType: string;
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
