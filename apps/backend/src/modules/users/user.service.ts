import { ExceptionMessage } from "~/libs/enums/enums.js";
import { type Encrypt } from "~/libs/modules/encrypt/encrypt.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import { UserError } from "./libs/exceptions/exceptions.js";
import {
	type UserAuthResponseDto,
	type UserGetAllResponseDto,
	type UserProfileRequestDto,
	type UserSignUpRequestDto,
} from "./libs/types/types.js";

class UserService implements Service {
	private encrypt: Encrypt;
	private userRepository: UserRepository;

	public constructor(encrypt: Encrypt, userRepository: UserRepository) {
		this.encrypt = encrypt;
		this.userRepository = userRepository;
	}

	public async addAvatar(id: number, fileId: number): Promise<void> {
		await this.userRepository.addAvatar(id, fileId);
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

		const { firstName, id, lastName } = user.toObject();
		const nickname = `${firstName.toLowerCase().replaceAll(/['-]/g, "")}${id}`;

		const userWithNickname = (await this.userRepository.update(id, {
			firstName,
			lastName,
			nickname,
		})) as UserEntity;

		return userWithNickname.toObject();
	}

	public async delete(userId: number): Promise<boolean> {
		const user = await this.userRepository.find(userId);

		if (!user) {
			throw new UserError({
				message: ExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return await this.userRepository.delete(userId);
	}

	public find(): Promise<UserEntity | null> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<UserGetAllResponseDto> {
		const users = await this.userRepository.findAll();

		return { items: users.map((user) => user.toObject()) };
	}

	public async findById(id: number): Promise<UserAuthResponseDto | null> {
		const user = await this.userRepository.findById(id);

		return user?.toObject() ?? null;
	}

	public async getByEmail(email: string): Promise<UserEntity | null> {
		return await this.userRepository.getByEmail(email);
	}

	public async getByNickname(nickname: string): Promise<UserEntity | null> {
		return await this.userRepository.getByNickname(nickname);
	}

	public async update(
		userId: number,
		userProfile: UserProfileRequestDto,
	): Promise<UserAuthResponseDto | null> {
		const { firstName, lastName, nickname } = userProfile;
		const user = await this.userRepository.getByNickname(nickname);
		const hasUser = Boolean(user);
		const isSameUser = Boolean(user?.toObject().id === userId);

		if (hasUser && !isSameUser) {
			throw new UserError({
				message: ExceptionMessage.NICKNAME_ALREADY_EXISTS,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const updatedUser = await this.userRepository.update(userId, {
			firstName,
			lastName,
			nickname: nickname === "" ? null : nickname,
		});

		return updatedUser?.toObject() ?? null;
	}
}

export { UserService };
