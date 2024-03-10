import {
	type FastifyReply,
	type FastifyRequest,
	type HookHandlerDoneFunction,
} from "fastify";

import {
	ExceptionMessage,
	HTTPCode,
	type PermissionKey,
	PermissionMode,
} from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { PermissionError } from "~/modules/permissions/libs/exceptions/exceptions.js";

const checkUserPermissions =
	(
		permissionsOnPage: ValueOf<typeof PermissionKey>[],
		mode: ValueOf<typeof PermissionMode>,
	) =>
	(
		request: FastifyRequest,
		_reply: FastifyReply,
		done: HookHandlerDoneFunction,
	): void => {
		const { user } = request;
		const hasUser = Boolean(user);

		if (!hasUser) {
			throw new PermissionError({
				message: ExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const userPermissionsKeys = user?.groups.flatMap((group) => {
			return group.permissions.map((permission) => {
				return permission.key;
			});
		}) as string[];

		const hasAllPermissions =
			mode === PermissionMode.ONE_OF
				? permissionsOnPage.some((permission) => {
						return userPermissionsKeys.includes(permission);
					})
				: permissionsOnPage.every((permission) => {
						return userPermissionsKeys.includes(permission);
					});

		if (!hasAllPermissions) {
			throw new PermissionError({
				message: ExceptionMessage.NO_PERMISSION,
				status: HTTPCode.FORBIDDEN,
			});
		}

		done();
	};

export { checkUserPermissions };
