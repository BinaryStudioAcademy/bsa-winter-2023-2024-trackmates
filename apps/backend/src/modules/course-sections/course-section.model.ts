import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { CourseModel } from "~/modules/courses/courses.js";

class CourseSectionModel extends AbstractModel {
	public static relationMappings = (): RelationMappings => {
		return {
			course: {
				join: {
					from: `${DatabaseTableName.COURSE_SECTIONS}.courseId`,
					to: `${DatabaseTableName.COURSES}.id`,
				},
				modelClass: CourseModel,
				relation: Model.HasOneRelation,
			},
		};
	};

	public course!: CourseModel | null;

	public courseId!: number;

	public title!: string;

	public static override get tableName(): string {
		return DatabaseTableName.COURSE_SECTIONS;
	}
}

export { CourseSectionModel };
