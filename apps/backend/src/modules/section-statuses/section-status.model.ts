import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { type ValueOf } from "~/libs/types/types.js";
import { CourseSectionModel } from "~/modules/course-sections/course-sections.js";
import { type UserModel } from "~/modules/users/users.js";

import { type SectionStatus } from "./libs/enums/enums.js";

class SectionStatusModel extends AbstractModel {
	public static relationMappings = (): RelationMappings => {
		return {
			courseSections: {
				join: {
					from: `${DatabaseTableName.SECTION_STATUSES}.courseSectionId`,
					to: `${DatabaseTableName.COURSE_SECTIONS}.id`,
				},
				modelClass: CourseSectionModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	};

	public courseSection!: CourseSectionModel;

	public courseSectionId!: number;

	public status!: ValueOf<typeof SectionStatus>;

	public user!: UserModel;

	public userId!: number;

	public static override get tableName(): string {
		return DatabaseTableName.SECTION_STATUSES;
	}
}

export { SectionStatusModel };
