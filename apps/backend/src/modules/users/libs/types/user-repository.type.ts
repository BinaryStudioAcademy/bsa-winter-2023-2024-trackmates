import { Repository } from "~/libs/types/repository.type.js";
import { UserModel } from "../../user.model.js";

export type UserRepository = Repository & {
	getByEmail(email: string): Promise<UserModel | undefined>;
};
