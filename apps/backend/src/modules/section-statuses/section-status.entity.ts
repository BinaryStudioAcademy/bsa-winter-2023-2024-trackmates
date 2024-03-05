import { type Entity, type ValueOf } from "~/libs/types/types.js";

import { type SectionStatus } from "./libs/enums/enums.js";

class SectionStatusEntity implements Entity {
	private createdAt: string;

	private id: null | number;

	private status: ValueOf<typeof SectionStatus>;

	public courseSectionId: number;

	public updatedAt: string;

	public userId: number;

	private constructor({
		courseSectionId,
		createdAt,
		id,
		status,
		updatedAt,
		userId,
	}: {
		courseSectionId: number;
		createdAt: string;
		id: null | number;
		status: ValueOf<typeof SectionStatus>;
		updatedAt: string;
		userId: number;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.status = status;
		this.updatedAt = updatedAt;
		this.courseSectionId = courseSectionId;
		this.userId = userId;
	}

	public static initialize({
		courseSectionId,
		createdAt,
		id,
		status,
		updatedAt,
		userId,
	}: {
		courseSectionId: number;
		createdAt: string;
		id: null | number;
		status: ValueOf<typeof SectionStatus>;
		updatedAt: string;
		userId: number;
	}): SectionStatusEntity {
		return new SectionStatusEntity({
			courseSectionId,
			createdAt,
			id,
			status,
			updatedAt,
			userId,
		});
	}

	public static initializeNew({
		courseSectionId,
		status,
		userId,
	}: {
		courseSectionId: number;
		status: ValueOf<typeof SectionStatus>;
		userId: number;
	}): SectionStatusEntity {
		return new SectionStatusEntity({
			courseSectionId,
			createdAt: "",
			id: null,
			status,
			updatedAt: "",
			userId,
		});
	}

	public toNewObject(): {
		courseSectionId: number;
		status: ValueOf<typeof SectionStatus>;
		userId: number;
	} {
		return {
			courseSectionId: this.courseSectionId,
			status: this.status,
			userId: this.userId,
		};
	}

	public toObject(): {
		courseSectionId: number;
		id: number;
		status: ValueOf<typeof SectionStatus>;
		userId: number;
	} {
		return {
			courseSectionId: this.courseSectionId,
			id: this.id as number,
			status: this.status,
			userId: this.userId,
		};
	}
}

export { SectionStatusEntity };
