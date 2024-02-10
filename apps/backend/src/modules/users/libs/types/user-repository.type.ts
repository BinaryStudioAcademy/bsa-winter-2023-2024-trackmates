import { Repository } from "~/libs/types/types.js";

import { UserEntity } from "../../user.entity.js";
import { User } from "./types.js";

type UserRepository = Repository<UserEntity> & {
	findById(id: number): Promise<User | null>;
};

export { type UserRepository };
