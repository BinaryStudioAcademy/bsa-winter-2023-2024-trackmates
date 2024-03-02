import { type Entity } from "~/libs/types/types.js";

import { type CourseEntity } from "../courses/course.entity.js";

class CourseSectionEntity implements Entity {
	private course: CourseEntity | null;

	private courseId: number;

	private createdAt: string;

	private id: null | number;

	private title: string;

	private updatedAt: string;

	private constructor({
		course,
		courseId,
		createdAt,
		id,
		title,
		updatedAt,
	}: {
		course: CourseEntity | null;
		courseId: number;
		createdAt: string;
		id: null | number;
		title: string;
		updatedAt: string;
	}) {
		this.course = course;
		this.createdAt = createdAt;
		this.id = id;
		this.title = title;
		this.courseId = courseId;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		course,
		courseId,
		createdAt,
		id,
		title,
		updatedAt,
	}: {
		course: CourseEntity | null;
		courseId: number;
		createdAt: string;
		id: null | number;
		title: string;
		updatedAt: string;
	}): CourseSectionEntity {
		return new CourseSectionEntity({
			course,
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
			course: null,
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
		course: ReturnType<CourseEntity["toObject"]> | null;
		courseId: number;
		id: number;
		title: string;
	} {
		return {
			course: this.course?.toObject() || null,
			courseId: this.courseId,
			id: this.id as number,
			title: this.title,
		};
	}
}

export { CourseSectionEntity };
