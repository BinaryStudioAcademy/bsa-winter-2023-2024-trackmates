import { type PermissionResponseDto } from "../../../permissions/permissions.js";

type GroupResponseDto = {
	id: number;
	key: string;
	name: string;
	permissions: PermissionResponseDto[];
};

export { type GroupResponseDto };
