import { Repository } from "~/libs/types/types.js";
import { UserEntity } from "../../user.entity.js";
import { UserWithPassword } from "shared";

type UserRepository = Repository<UserEntity> & {
	getByEmail(email: string): Promise<UserWithPassword | null>;
};

export { type UserRepository };
