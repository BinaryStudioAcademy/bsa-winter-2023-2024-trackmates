import {
	UserGetAllResponseDto,
	UserSignUpRequestDto,
	UserSignUpResponseDto,
	UserWithPassword,
} from "shared";
import { UserEntity } from "../../user.entity.js";
import { Service } from "~/libs/types/types.js";

type UserService = Pick<Service<UserEntity>, "delete" | "find" | "update"> & {
	create(payload: UserSignUpRequestDto): Promise<UserSignUpResponseDto>;

	findAll(): Promise<UserGetAllResponseDto>;

	getByEmail(email: string): Promise<UserWithPassword | null>;
};

export { type UserService };
