import { type Entity } from "~/libs/types/types.js";

class CourseSectionEntity implements Entity {
	private createdAt: string;

	private id: null | number;

	public courseId: number;

	public description: string;

	public title: string;

	public updatedAt: string;

	private constructor({
		courseId,
		createdAt,
		description,
		id,
		title,
		updatedAt,
	}: {
		courseId: number;
		createdAt: string;
		description: string;
		id: null | number;
		title: string;
		updatedAt: string;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.title = title;
		this.description = description;
		this.courseId = courseId;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		courseId,
		createdAt,
		description,
		id,
		title,
		updatedAt,
	}: {
		courseId: number;
		createdAt: string;
		description: string;
		id: null | number;
		title: string;
		updatedAt: string;
	}): CourseSectionEntity {
		return new CourseSectionEntity({
			courseId,
			createdAt,
			description,
			id,
			title,
			updatedAt,
		});
	}

	public static initializeNew({
		courseId,
		description,
		title,
	}: {
		courseId: number;
		description: string;
		title: string;
	}): CourseSectionEntity {
		return new CourseSectionEntity({
			courseId,
			createdAt: "",
			description,
			id: null,
			title,
			updatedAt: "",
		});
	}

	public toNewObject(): {
		courseId: number;
		description: string;
		title: string;
	} {
		return {
			courseId: this.courseId,
			description: this.description,
			title: this.title,
		};
	}

	public toObject(): {
		courseId: number;
		description: string;
		id: number;
		title: string;
	} {
		return {
			courseId: this.courseId,
			description: this.description,
			id: this.id as number,
			title: this.title,
		};
	}
}

export { CourseSectionEntity };
