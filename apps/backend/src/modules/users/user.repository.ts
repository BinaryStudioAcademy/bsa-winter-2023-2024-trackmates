import { Repository } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";

import { type UserProfileRequestDto } from "./libs/types/types.js";
import { UserDetailsModel } from "./user-details/user-details.model.js";

class UserRepository implements Repository<UserEntity> {
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
		const { email, firstName, lastName, passwordHash, passwordSalt } =
			entity.toNewObject();

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
			.insert({ firstName, lastName, userId: user.id })
			.returning("*")
			.execute();

		return UserEntity.initialize({
			createdAt: user.createdAt,
			email: user.email,
			firstName: userDetails.firstName,
			id: user.id,
			lastName: userDetails.lastName,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
			updatedAt: user.updatedAt,
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
				createdAt: user.createdAt,
				email: user.email,
				firstName: user.userDetails.firstName,
				id: user.id,
				lastName: user.userDetails.lastName,
				passwordHash: user.passwordHash,
				passwordSalt: user.passwordSalt,
				updatedAt: user.updatedAt,
			}),
		);
	}

	public async findById(id: number): Promise<UserEntity | null> {
		const user = await this.userModel
			.query()
			.findById(id)
			.withGraphJoined("userDetails")
			.execute();

		return user
			? UserEntity.initialize({
					createdAt: user.createdAt,
					email: user.email,
					firstName: user.userDetails.firstName,
					id: user.id,
					lastName: user.userDetails.lastName,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					updatedAt: user.updatedAt,
				})
			: null;
	}

	public async getByEmail(email: string): Promise<UserEntity | null> {
		const user = await this.userModel
			.query()
			.findOne({ email })
			.withGraphJoined("userDetails")
			.execute();

		return user
			? UserEntity.initialize({
					createdAt: user.createdAt,
					email: user.email,
					firstName: user.userDetails.firstName,
					id: user.id,
					lastName: user.userDetails.lastName,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					updatedAt: user.updatedAt,
				})
			: null;
	}

	public async update(data: UserProfileRequestDto): Promise<UserEntity | null> {
		const user = await this.userModel.query().findById(data.id).execute();

		if (!user) {
			return null;
		}

		const updatedUserDetails = (await this.userDetailsModel
			.query()
			.patch({
				firstName: data.firstName,
				lastName: data.lastName,
			})
			.where({
				userId: data.id,
			})
			.execute()
			.then(() => {
				return this.userDetailsModel
					.query()
					.findOne({
						userId: data.id,
					})
					.execute();
			})) as UserDetailsModel;

		return UserEntity.initialize({
			createdAt: user.createdAt,
			email: user.email,
			firstName: updatedUserDetails.firstName,
			id: user.id,
			lastName: updatedUserDetails.lastName,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
			updatedAt: user.updatedAt,
		});
	}
}

export { UserRepository };
