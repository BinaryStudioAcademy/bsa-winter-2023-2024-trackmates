import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { CourseModel } from "~/modules/courses/course.model.js";
import { GroupModel } from "~/modules/groups/group.model.js";

import { UserDetailsModel } from "./user-details.model.js";

class UserModel extends AbstractModel {
	public static relationMappings = (): RelationMappings => {
		return {
			courses: {
				join: {
					from: `${DatabaseTableName.USERS}.id`,
					through: {
						from: `${DatabaseTableName.COURSES_TO_USERS}.userId`,
						to: `${DatabaseTableName.COURSES_TO_USERS}.courseId`,
					},
					to: `${DatabaseTableName.COURSES}.id`,
				},
				modelClass: CourseModel,
				relation: Model.ManyToManyRelation,
			},
			friends: {
				join: {
					from: `${DatabaseTableName.USERS}.id`,
					through: {
						from: `${DatabaseTableName.FRIENDS}.follower_id`,
						to: `${DatabaseTableName.FRIENDS}.following_id`,
					},
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.ManyToManyRelation,
			},
			groups: {
				join: {
					from: `${DatabaseTableName.USERS}.id`,
					through: {
						from: `${DatabaseTableName.USERS_TO_GROUPS}.userId`,
						to: `${DatabaseTableName.USERS_TO_GROUPS}.groupId`,
					},
					to: `${DatabaseTableName.GROUPS}.id`,
				},
				modelClass: GroupModel,
				relation: Model.ManyToManyRelation,
			},
			userDetails: {
				join: {
					from: `${DatabaseTableName.USERS}.id`,
					to: `${DatabaseTableName.USER_DETAILS}.userId`,
				},
				modelClass: UserDetailsModel,
				relation: Model.HasOneRelation,
			},
		};
	};

	public email!: string;

	public passwordHash!: string;

	public passwordSalt!: string;

	public userDetails!: UserDetailsModel;

	public static override get tableName(): string {
		return DatabaseTableName.USERS;
	}
}

export { UserModel };
