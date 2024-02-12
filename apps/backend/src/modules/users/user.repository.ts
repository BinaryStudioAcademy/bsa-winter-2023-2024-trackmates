import { Repository } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";

import { UserDetailsModel } from "./user-details/user-details.model.js";

class UserRepository implements Repository {
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

		return UserEntity.initialize({
			...user,
			firstName: userDetails.firstName,
			lastName: userDetails.lastName,
		});
	}

	public delete(): Promise<boolean> {
		return Promise.resolve(true);
	}

	public find(): Promise<UserEntity | null> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<UserEntity[]> {
		const users = await this.userModel
			.query()
			.withGraphJoined("userDetails")
			.execute();

		return users.map((user) =>
			UserEntity.initialize({
				...user,
				firstName: user.userDetails.firstName,
				lastName: user.userDetails.lastName,
			}),
		);
	}

	public async getByEmail(email: string): Promise<UserEntity | null> {
		const user = await this.userModel
			.query()
			.findOne({ email })
			.withGraphJoined("userDetails")
			.execute();
		if (user) {
			return UserEntity.initialize({
				...user,
				firstName: user.userDetails.firstName,
				lastName: user.userDetails.lastName,
			});
		}
		return null;
	}

	public update(): Promise<UserEntity> {
		throw new Error("Method not implemented.");
	}
}

export { UserRepository };
