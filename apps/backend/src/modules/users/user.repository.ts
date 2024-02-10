import { type Repository } from "~/libs/types/types.js";

import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";

import { UserRepository } from "./libs/types/types.js";

import { UserDetailsModel } from "./user-details/user-details.model.js";

class User implements UserRepository {
	private userDetailsModel: typeof UserDetailsModel;
	private userModel: typeof UserModel;
	public constructor(
		userModel: typeof UserModel,
		userDetailsModel: typeof UserDetailsModel,
	) {
		this.userModel = userModel;
		this.userDetailsModel = userDetailsModel;
	}

	public async create(entity: UserEntity): Promise<UserEntity> {
		const { email, passwordHash, passwordSalt } = entity.toNewObject();

		const user = await this.userModel
			.query()
			.insert({
				email,
				passwordHash,
				passwordSalt,
			})
			.returning("*")
			.execute();
		const userDetails = await this.userDetailsModel
			.query()
			.insert({ userId: user.id })
			.returning("*")
			.execute();

		return UserEntity.initialize({ ...user, userDetails });
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Repository["find"]> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<UserEntity[]> {
		const users = await this.userModel
			.query()
			.withGraphJoined("userDetails")
			.execute();

		return users.map((user) => UserEntity.initialize(user));
	}

	public async getByEmail(email: string): Promise<UserModel | undefined> {
		return await this.userModel.query().findOne({ email }).execute();
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { User as UserRepository };
