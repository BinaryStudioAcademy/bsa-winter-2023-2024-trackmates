import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { CourseSectionModel } from "~/modules/course-sections/course-sections.js";
import { VendorModel } from "~/modules/vendors/vendors.js";

class UserCourseModel extends AbstractModel {
	public static relationMappings = (): RelationMappings => {
		return {
			courseSections: {
				join: {
					from: `${DatabaseTableName.COURSES}.id`,
					to: `${DatabaseTableName.COURSE_SECTIONS}.courseId`,
				},
				modelClass: CourseSectionModel,
				relation: Model.HasManyRelation,
			},
			vendor: {
				join: {
					from: `${DatabaseTableName.COURSES}.vendorId`,
					to: `${DatabaseTableName.VENDORS}.id`,
				},
				modelClass: VendorModel,
				relation: Model.HasOneRelation,
			},
		};
	};

	public description!: string;

	public image!: string;

	public progress!: number;

	public title!: string;

	public url!: string;

	public vendor!: VendorModel;

	public vendorCourseId!: string;

	public vendorId!: number;

	public static override get tableName(): string {
		return DatabaseTableName.COURSES;
	}
}

export { UserCourseModel };
