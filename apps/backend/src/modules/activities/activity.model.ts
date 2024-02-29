import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { CourseSectionModel } from "~/modules/course-sections/course-sections.js";
import { type CourseModel } from "~/modules/courses/courses.js";
import { type ValueOf } from "~/modules/files/libs/types/types.js";
import { type SectionStatus } from "~/modules/section-statuses/section-statuses.js";
import { UserModel } from "~/modules/users/users.js";

import { type ActivityType } from "./libs/types/types.js";

type ActionMap = {
	FINISH_COURSE: CourseModel;
	FINISH_SECTION: CourseSectionModel;
};

class ActivityModel<TYPE extends ActivityType> extends AbstractModel {
	public action!: ActionMap[TYPE];

	public time!: string;

	public type!: ActivityType;

	public user!: UserModel;

	public userId!: number;
}

class SectionActivityModel extends ActivityModel<"FINISH_SECTION"> {
	public static relationMappings = (): RelationMappings => {
		return {
			action: {
				join: {
					from: `${DatabaseTableName.SECTION_STATUSES}.courseSectionId`,
					to: `${DatabaseTableName.COURSE_SECTIONS}.id`,
				},
				modelClass: CourseSectionModel,
				relation: Model.BelongsToOneRelation,
			},
			user: {
				join: {
					from: `${DatabaseTableName.SECTION_STATUSES}.userId`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	};

	public status!: ValueOf<typeof SectionStatus>;

	public static override get tableName(): string {
		return DatabaseTableName.SECTION_STATUSES;
	}
}

export { SectionActivityModel };
