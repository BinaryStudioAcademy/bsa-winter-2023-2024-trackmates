import { type PermissionKey, PermissionMode } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

const checkIfUserHasPermissions = (
	user: UserAuthResponseDto,
	permissions: ValueOf<typeof PermissionKey>[],
	mode: ValueOf<typeof PermissionMode>,
): boolean => {
	const userPermissionsKeys = new Set(
		user.groups.flatMap((group) => {
			return group.permissions.map((permission) => {
				return permission.key;
			});
		}),
	);

	return mode === PermissionMode.ONE_OF
		? permissions.some((key) => {
				return userPermissionsKeys.has(key);
			})
		: permissions.every((key) => {
				return userPermissionsKeys.has(key);
			});
};

export { checkIfUserHasPermissions };
