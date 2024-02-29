import { DatabaseTableName } from "~/libs/modules/database/database.js";
import { type Repository } from "~/libs/types/types.js";
import { CourseSectionEntity } from "~/modules/course-sections/course-sections.js";
import { SectionStatus } from "~/modules/section-statuses/section-statuses.js";
import { UserEntity } from "~/modules/users/users.js";

import { ActivityEntity } from "./activity.entity.js";
import { type SectionActivityModel } from "./activity.model.js";

type SectionActivityEntity = ActivityEntity<"FINISH_SECTION">;

class SectionActivityRepository
	implements Pick<Repository<SectionActivityEntity>, "findAll">
{
	private activityModel: typeof SectionActivityModel;

	public constructor(activityModel: typeof SectionActivityModel) {
		this.activityModel = activityModel;
	}

	public async findAll(userId: number): Promise<SectionActivityEntity[]> {
		const activities = await this.activityModel
			.query()
			.whereIn(
				`${DatabaseTableName.SECTION_STATUSES}.userId`,
				this.activityModel
					.query()
					.from(DatabaseTableName.FRIENDS)
					.select("followingId")
					.where({ followerId: userId }),
			)
			.withGraphJoined("user.userDetails.avatarFile")
			.withGraphJoined("action")
			.where("status", SectionStatus.COMPLETED)
			.castTo<SectionActivityModel[]>()
			.execute();

		return activities.map((activity) =>
			ActivityEntity.initialize<"FINISH_SECTION">({
				action: CourseSectionEntity.initialize({
					courseId: activity.action.courseId,
					createdAt: activity.action.createdAt,
					description: activity.action.description,
					id: activity.action.id,
					title: activity.action.title,
					updatedAt: activity.action.title,
				}),
				id: `finish-section-${activity.id}`,
				time: activity.updatedAt,
				type: "FINISH_SECTION",
				user: UserEntity.initialize({
					avatarUrl: activity.user.userDetails.avatarFile?.url || null,
					createdAt: activity.user.createdAt,
					email: activity.user.email,
					firstName: activity.user.userDetails.firstName,
					id: activity.user.id,
					lastName: activity.user.userDetails.lastName,
					passwordHash: "",
					passwordSalt: "",
					updatedAt: activity.user.updatedAt,
				}),
			}),
		);
	}
}

export { SectionActivityRepository };
