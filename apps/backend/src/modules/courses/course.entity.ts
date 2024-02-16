import { type Entity } from "~/libs/types/types.js";

class CourseEntity implements Entity {
	private createdAt: string;

	private description: string;

	private id: null | number;

	private title: string;

	private url: string;

	private vendorId: number;

	public updatedAt: string;

	private constructor({
		createdAt,
		description,
		id,
		title,
		updatedAt,
		url,
		vendorId,
	}: {
		createdAt: string;
		description: string;
		id: null | number;
		title: string;
		updatedAt: string;
		url: string;
		vendorId: number;
	}) {
		this.createdAt = createdAt;
		this.description = description;
		this.id = id;
		this.title = title;
		this.updatedAt = updatedAt;
		this.url = url;
		this.vendorId = vendorId;
	}

	public static initialize({
		createdAt,
		description,
		id,
		title,
		updatedAt,
		url,
		vendorId,
	}: {
		createdAt: string;
		description: string;
		id: null | number;
		title: string;
		updatedAt: string;
		url: string;
		vendorId: number;
	}): CourseEntity {
		return new CourseEntity({
			createdAt,
			description,
			id,
			title,
			updatedAt,
			url,
			vendorId,
		});
	}

	public static initializeNew({
		description,
		title,
		url,
		vendorId,
	}: {
		description: string;
		title: string;
		url: string;
		vendorId: number;
	}): CourseEntity {
		return new CourseEntity({
			createdAt: "",
			description,
			id: null,
			title,
			updatedAt: "",
			url,
			vendorId,
		});
	}

	public toNewObject(): {
		createdAt: string;
		description: string;
		title: string;
		updatedAt: string;
		url: string;
		vendorId: number;
	} {
		return {
			createdAt: this.createdAt,
			description: this.description,
			title: this.title,
			updatedAt: this.updatedAt,
			url: this.url,
			vendorId: this.vendorId,
		};
	}

	public toObject(): {
		createdAt: string;
		description: string;
		id: number;
		title: string;
		updatedAt: string;
		url: string;
		vendorId: number;
	} {
		return {
			createdAt: this.createdAt,
			description: this.description,
			id: this.id as number,
			title: this.title,
			updatedAt: this.updatedAt,
			url: this.url,
			vendorId: this.vendorId,
		};
	}
}

export { CourseEntity };
