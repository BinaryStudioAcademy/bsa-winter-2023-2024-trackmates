import { Encrypt } from "~/libs/modules/encrypt/encrypt.js";
import { Service } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import {
	type UserAuthResponseDto,
	type UserGetAllResponseDto,
	type UserSignUpRequestDto,
} from "./libs/types/types.js";

class UserService implements Service {
	private encrypt: Encrypt;
	private userRepository: UserRepository;

	public constructor(encrypt: Encrypt, userRepository: UserRepository) {
		this.encrypt = encrypt;
		this.userRepository = userRepository;
	}

	public async create(
		payload: UserSignUpRequestDto,
	): Promise<UserAuthResponseDto> {
		const { hash, salt } = await this.encrypt.encrypt(payload.password);

		const user = await this.userRepository.create(
			UserEntity.initializeNew({
				email: payload.email,
				firstName: payload.firstName,
				lastName: payload.lastName,
				passwordHash: hash,
				passwordSalt: salt,
			}),
		);

		return user.toObject();
	}

	public delete(): Promise<boolean> {
		return Promise.resolve(true);
	}

	public find(): Promise<UserEntity | null> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<UserGetAllResponseDto> {
		const users = await this.userRepository.findAll();

		return {
			items: users.map((user) => user.toObject()),
		};
	}

	public async findById(id: number): Promise<UserAuthResponseDto | null> {
		const user = await this.userRepository.findById(id);

		return user?.toObject() ?? null;
	}

	public async getByEmail(email: string): Promise<UserEntity | null> {
		return await this.userRepository.getByEmail(email);
	}

	public update(): Promise<UserEntity | null> {
		return Promise.resolve(null);
	}
}

export { UserService };
