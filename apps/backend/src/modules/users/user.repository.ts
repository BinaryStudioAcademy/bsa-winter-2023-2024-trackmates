import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";
import { type UserRepository as UserRepositoryT } from "./user-repository.type.js";

class UserRepository implements UserRepositoryT {
	private userModel: typeof UserModel;
	public constructor(userModel: typeof UserModel) {
		this.userModel = userModel;
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

		return UserEntity.initialize(user);
	}

	public delete(): ReturnType<UserRepositoryT["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<UserRepositoryT["find"]> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<UserEntity[]> {
		const users = await this.userModel.query().execute();

		return users.map((user) => UserEntity.initialize(user));
	}

	public update(): ReturnType<UserRepositoryT["update"]> {
		throw new Error("Method not implemented.");
	}

	public getByEmail(email: string): Promise<UserEntity | null> {
		throw new Error("Method not implemented.");
	}
}

export { UserRepository };
