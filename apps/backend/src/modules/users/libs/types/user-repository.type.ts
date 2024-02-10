import { Repository } from "~/libs/types/repository.type.js";

import { UserModel } from "../../user.model.js";

type UserRepository = Repository & {
	getByEmail(email: string): Promise<UserModel | undefined>;
};

export { UserRepository };
