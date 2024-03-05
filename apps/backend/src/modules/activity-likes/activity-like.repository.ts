import { DatabaseTableName } from "~/libs/modules/database/database.js";
import { type Repository } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";

import {type ActivityLikeModel} from './activity-like.model.js';
import { RelationName } from "./libs/enums/enums.js";

class ActivityLikeRepository implements Repository<>{
}

export {ActivityLikeRepository}