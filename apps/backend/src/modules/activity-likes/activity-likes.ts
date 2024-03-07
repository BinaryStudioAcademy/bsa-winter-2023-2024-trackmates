import { ActivityLikeModel } from "./activity-like.model.js";
import { ActivityLikeRepository } from "./activity-like.repository.js";

const activityLikeRepository = new ActivityLikeRepository(ActivityLikeModel);

export { activityLikeRepository };
export { ActivityLikeEntity } from "./activity-like.entity.js";
export { ActivityLikeModel } from "./activity-like.model.js";
export { type ActivityLikeRepository } from "./activity-like.repository.js";
export { type ActivityLikeRequestDto } from "./libs/types/types.js";
export { activityLikeChangeValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
