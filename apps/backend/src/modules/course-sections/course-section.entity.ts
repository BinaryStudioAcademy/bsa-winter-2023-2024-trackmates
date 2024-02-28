import { type Entity } from "~/libs/types/types.js";
import { type SectionStatusEntity } from "~/modules/section-statuses/section-statuses.js";

class CourseSectionEntity implements Entity {
	private createdAt: string;

	private id: null | number;

	public courseId: number;

	public description: string;

	public sectionStatus: SectionStatusEntity | null;

	public title: string;

	public updatedAt: string;

	private constructor({
		courseId,
		createdAt,
		description,
		id,
		sectionStatus,
		title,
		updatedAt,
	}: {
		courseId: number;
		createdAt: string;
		description: string;
		id: null | number;
		sectionStatus: SectionStatusEntity | null;
		title: string;
		updatedAt: string;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.title = title;
		this.description = description;
		this.sectionStatus = sectionStatus;
		this.courseId = courseId;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		courseId,
		createdAt,
		description,
		id,
		sectionStatus,
		title,
		updatedAt,
	}: {
		courseId: number;
		createdAt: string;
		description: string;
		id: null | number;
		sectionStatus: SectionStatusEntity | null;
		title: string;
		updatedAt: string;
	}): CourseSectionEntity {
		return new CourseSectionEntity({
			courseId,
			createdAt,
			description,
			id,
			sectionStatus,
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
			sectionStatus: null,
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
		sectionStatus: ReturnType<SectionStatusEntity["toObject"]> | null;
		title: string;
	} {
		return {
			courseId: this.courseId,
			description: this.description,
			id: this.id as number,
			sectionStatus: this.sectionStatus?.toObject() ?? null,
			title: this.title,
		};
	}
}

export { CourseSectionEntity };
