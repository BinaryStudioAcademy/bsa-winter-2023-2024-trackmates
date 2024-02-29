import { type Entity } from "~/libs/types/types.js";
import { type CourseSectionEntity } from "~/modules/course-sections/course-section.entity.js";
import { type UserEntity } from "~/modules/users/user.entity.js";

import { type CourseEntity } from "../courses/course.entity.js";
import { type ActivityType } from "./libs/types/types.js";

type ActionMap = {
	FINISH_COURSE: CourseEntity;
	FINISH_SECTION: CourseSectionEntity;
};

class ActivityEntity<TYPE extends ActivityType> implements Entity {
	public action: ActionMap[TYPE];

	public id: string;

	public time: string;

	public type: TYPE;

	public user: UserEntity;

	private constructor({
		action,
		id,
		time,
		type,
		user,
	}: {
		action: ActionMap[TYPE];
		id: string;
		time: string;
		type: TYPE;
		user: UserEntity;
	}) {
		this.action = action;
		this.id = id;
		this.time = time;
		this.type = type;
		this.user = user;
	}

	public static initialize<TYPE extends ActivityType>({
		action,
		id,
		time,
		type,
		user,
	}: {
		action: ActionMap[TYPE];
		id: string;
		time: string;
		type: TYPE;
		user: UserEntity;
	}): ActivityEntity<TYPE> {
		return new ActivityEntity<TYPE>({
			action,
			id,
			time,
			type,
			user,
		});
	}

	public toNewObject(): unknown {
		throw new Error("Method not implemented.");
	}

	public toObject(): {
		action: ReturnType<ActionMap[TYPE]["toObject"]>;
		id: string;
		time: string;
		type: TYPE;
		user: {
			avatarUrl: string;
			createdAt: string;
			email: string;
			firstName: string;
			id: number;
			lastName: string;
			updatedAt: string;
		};
	} {
		return {
			action: this.action.toNewObject() as ReturnType<
				ActionMap[TYPE]["toObject"]
			>,
			id: this.id,
			time: this.time,
			type: this.type,
			user: this.user.toObject(),
		};
	}
}

export { ActivityEntity };
