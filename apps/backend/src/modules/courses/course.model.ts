import { Model } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { VendorModel } from "~/modules/vendors/vendors.js";

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
		};
	};

	public description!: string;

	public image!: string;

	public imageSmall!: string;

	public title!: string;

	public url!: string;

	public vendor!: VendorModel;

	public vendorCourseId!: string;

	public vendorId!: number;

	public static override get tableName(): string {
		return DatabaseTableName.COURSES;
	}
}

export { CourseModel };
