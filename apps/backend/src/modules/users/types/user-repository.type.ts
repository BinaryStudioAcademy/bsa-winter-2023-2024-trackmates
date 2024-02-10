import { Repository } from "~/libs/types/types.js";
import { UserEntity } from "../user.entity.js";

type UserRepository = Repository<UserEntity> & {
	getByEmail(email: string): Promise<UserEntity | null>;
};

export { type UserRepository };
