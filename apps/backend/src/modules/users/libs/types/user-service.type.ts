import {
	User,
	UserGetAllResponseDto,
	UserSignUpRequestDto,
	UserSignUpResponseDto,
} from "shared";

import { Service } from "~/libs/types/service.type.js";

import { UserEntity } from "../../user.entity.js";

type UserService = Pick<Service<UserEntity>, "delete" | "find" | "update"> & {
	create(payload: UserSignUpRequestDto): Promise<UserSignUpResponseDto>;

	findAll(): Promise<UserGetAllResponseDto>;

	getAuthenticatedUser(id: number): Promise<User | null>;
};

export { type UserService };
