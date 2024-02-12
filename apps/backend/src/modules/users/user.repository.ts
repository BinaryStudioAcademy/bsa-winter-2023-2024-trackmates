import { Repository } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";

class UserRepository implements Repository<UserEntity> {
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

	public delete(): Promise<boolean> {
		return Promise.resolve(true);
	}

	public find(): Promise<UserEntity | null> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<UserEntity[]> {
		const users = await this.userModel.query().execute();

		return users.map((user) => UserEntity.initialize(user));
	}

	public async findById(id: number): Promise<UserEntity | null> {
		const user = await this.userModel
			.query()
			.findById(id)
			.modify("withoutPassword")
			.execute();

		return user ? UserEntity.initialize(user) : null;
	}

	public async getByEmail(email: string): Promise<UserEntity | null> {
		const user = await this.userModel.query().findOne({ email }).execute();
		return user ? UserEntity.initialize(user) : null;
	}

	public update(): Promise<UserEntity | null> {
		return Promise.resolve(null);
	}
}

export { UserRepository };
