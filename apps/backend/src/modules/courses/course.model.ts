import { Model } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { VendorModel } from "../vendors/vendor.model.js";
// import { UserModel } from "../users/user.model.js";

class CourseModel extends AbstractModel {
	public static relationMappings = () => {
		return {
			vendor: {
				join: {
					from: `${DatabaseTableName.COURSES}.vendorId`,
					to: `${DatabaseTableName.VENDORS}.id`,
				},
				modelClass: VendorModel,
				relation: Model.HasOneRelation,
			},
			// users: {
			// 	relation: Model.ManyToManyRelation,
			// 	modelClass: UserModel,
			// 	join: {
			// 		from: 'course.id',
			// 		through: {
			// 			from: 'courses_to_users.courseId',
			// 			to: 'courses_to_users.userId'
			// 		},
			// 		to: 'users.id'
			// 	}
			// }
		};
	};

	public description!: string;

	public image!: string;

	public imageSmall!: string;

	public title!: string;

	public url!: string;

	public vendorCourseId!: string;

	public vendorId!: number;

	public static override get tableName(): string {
		return DatabaseTableName.COURSES;
	}
}

export { CourseModel };
