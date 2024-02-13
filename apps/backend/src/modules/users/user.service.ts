import { Encrypt } from "~/libs/modules/encrypt/encrypt.js";
import { Token } from "~/libs/modules/token/token.js";
import { Service } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import {
	type UserGetAllResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "./libs/types/types.js";

class UserService implements Service {
	private encrypt: Encrypt;
	private token: Token;
	private userRepository: UserRepository;

	public constructor(
		encrypt: Encrypt,
		token: Token,
		userRepository: UserRepository,
	) {
		this.encrypt = encrypt;
		this.token = token;
		this.userRepository = userRepository;
	}

	public async create(
		payload: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const { hash, salt } = await this.encrypt.encrypt(payload.password);

		const item = await this.userRepository.create(
			UserEntity.initializeNew({
				email: payload.email,
				firstName: payload.firstName,
				lastName: payload.lastName,
				passwordHash: hash,
				passwordSalt: salt,
			}),
		);

		const object = item.toObject();

		return {
			email: object.email,
			id: object.id,
			token: this.token.create({ id: object.id }),
		};
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
			items: items.map((item) => {
				const object = item.toObject();
				return {
					email: object.email,
					id: object.id,
				};
			}),
		};
	}

	public async getByEmail(email: string): Promise<UserEntity | null> {
		return await this.userRepository.getByEmail(email);
	}

	public update(): Promise<UserEntity | null> {
		return Promise.resolve(null);
	}
}

export { UserService };
