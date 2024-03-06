import { type ActivityModel } from "../../activity.model.js";

type ActivityModelWithLikes = ActivityModel & {
	likesCount: number;
};

export { type ActivityModelWithLikes };
