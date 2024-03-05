import { ActivityLikeModel } from "./activity-like.model.js";
import { ActivityLikeRepository } from "./activity-like.repository.js";

const activityLikeRepository = new ActivityLikeRepository(ActivityLikeModel);

export { activityLikeRepository };
