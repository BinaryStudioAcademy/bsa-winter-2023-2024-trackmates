import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { SectionStatusModel } from "~/modules/section-statuses/section-statuses.js";

class CourseSectionModel extends AbstractModel {
	public static relationMappings = (): RelationMappings => {
		return {
			sectionStatuses: {
				join: {
					from: `${DatabaseTableName.COURSE_SECTIONS}.id`,
					to: `${DatabaseTableName.SECTION_STATUSES}.courseSectionId`,
				},
				modelClass: SectionStatusModel,
				relation: Model.HasManyRelation,
			},
		};
	};

	public courseId!: number;

	public title!: string;

	public static override get tableName(): string {
		return DatabaseTableName.COURSE_SECTIONS;
	}
}

export { CourseSectionModel };
