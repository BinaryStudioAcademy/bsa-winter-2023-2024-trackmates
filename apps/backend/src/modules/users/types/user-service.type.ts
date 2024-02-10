import {
	UserGetAllResponseDto,
	UserSignUpRequestDto,
	UserSignUpResponseDto,
} from "shared";
import { UserEntity } from "../user.entity.js";
import { Service } from "~/libs/types/service.type.js";

type UserService = Pick<Service<UserEntity>, "delete" | "find" | "update"> & {
	create(payload: UserSignUpRequestDto): Promise<UserSignUpResponseDto>;

	findAll(): Promise<UserGetAllResponseDto>;

	getByEmail(email: string): Promise<UserEntity | null>;
};

export { type UserService };
