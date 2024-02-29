import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class CourseSectionModel extends AbstractModel {
	public courseId!: number;

	public description!: string;

	public title!: string;

	public static override get tableName(): string {
		return DatabaseTableName.COURSE_SECTIONS;
	}
}

export { CourseSectionModel };
