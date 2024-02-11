import { Encript } from "~/libs/modules/encript/encript.js";
import { Service } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import {
	type UserGetAllResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "./libs/types/types.js";
import { UserWithPassword } from "./libs/types/types.js";

class UserService implements Service {
	private encript: Encript;
	private userRepository: UserRepository;

	public constructor(encript: Encript, userRepository: UserRepository) {
		this.encript = encript;
		this.userRepository = userRepository;
	}

	public async create(
		payload: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const { hash, salt } = await this.encript.encript(payload.password);

		const item = await this.userRepository.create(
			UserEntity.initializeNew({
				email: payload.email,
				passwordHash: hash,
				passwordSalt: salt,
			}),
		);

		return item.toObject();
	}

	public delete(): Promise<boolean> {
		return Promise.resolve(true);
	}

	public find(): Promise<UserEntity | null> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<UserGetAllResponseDto> {
		const items = await this.userRepository.findAll();

		return {
			items: items.map((item) => item.toObject()),
		};
	}

	public async getByEmail(email: string): Promise<UserWithPassword | null> {
		return await this.userRepository.getByEmail(email);
	}

	public update(): Promise<UserEntity> {
		throw new Error("Method not implemented.");
	}
}

export { UserService };
