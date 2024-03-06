import { type Entity } from "~/libs/types/types.js";

class CourseSectionEntity implements Entity {
	private createdAt: string;

	private id: null | number;

	public courseId: number;

	public title: string;

	public updatedAt: string;

	private constructor({
		courseId,
		createdAt,
		id,
		title,
		updatedAt,
	}: {
		courseId: number;
		createdAt: string;
		id: null | number;
		title: string;
		updatedAt: string;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.title = title;
		this.courseId = courseId;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		courseId,
		createdAt,
		id,
		title,
		updatedAt,
	}: {
		courseId: number;
		createdAt: string;
		id: null | number;
		title: string;
		updatedAt: string;
	}): CourseSectionEntity {
		return new CourseSectionEntity({
			courseId,
			createdAt,
			id,
			title,
			updatedAt,
		});
	}

	public static initializeNew({
		courseId,
		title,
	}: {
		courseId: number;
		title: string;
	}): CourseSectionEntity {
		return new CourseSectionEntity({
			courseId,
			createdAt: "",
			id: null,
			title,
			updatedAt: "",
		});
	}

	public toNewObject(): {
		courseId: number;
		title: string;
	} {
		return {
			courseId: this.courseId,
			title: this.title,
		};
	}

	public toObject(): {
		courseId: number;
		id: number;
		title: string;
	} {
		return {
			courseId: this.courseId,
			id: this.id as number,
			title: this.title,
		};
	}
}

export { CourseSectionEntity };
