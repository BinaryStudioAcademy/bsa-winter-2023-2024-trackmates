import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import {
	type UserGetAllResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "./libs/types/types.js";
import { type UserService as UserServiceT } from "./libs/types/types.js";
import { UserWithPassword } from "shared";
import { encrypt } from "../auth/helpers/crypt/encrypt.helper.js";

class UserService implements UserServiceT {
	private userRepository: UserRepository;

	public constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	public async create(
		payload: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const item = await this.userRepository.create(
			UserEntity.initializeNew({
				email: payload.email,
				passwordHash: await encrypt(payload.password), // TODO
				passwordSalt: "SALT", // TODO
			}),
		);

		return item.toObject();
	}

	public delete(): ReturnType<UserServiceT["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<UserServiceT["find"]> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<UserGetAllResponseDto> {
		const items = await this.userRepository.findAll();

		return {
			items: items.map((item) => item.toObject()),
		};
	}

	public update(): ReturnType<UserServiceT["update"]> {
		throw new Error("Method not implemented.");
	}

	public async getByEmail(email: string): Promise<UserWithPassword | null> {
		return await this.userRepository.getByEmail(email);
	}
}

export { UserService };
