import {
	type FastifyReply,
	type FastifyRequest,
	type HookHandlerDoneFunction,
} from "fastify";

import { ExceptionMessage, HTTPCode } from "~/libs/enums/enums.js";
import { UserErrorMessage } from "~/modules/users/libs/enums/enums.js";
import { type UserAuthResponseDto, UserError } from "~/modules/users/users.js";

const checkByParameterIfNotTheSameUser =
	<T>(parameterName: keyof T) =>
	(
		request: FastifyRequest,
		_reply: FastifyReply,
		done: HookHandlerDoneFunction,
	): void => {
		const { params, user } = request;
		const hasUser = Boolean(user);

		if (!hasUser) {
			throw new UserError({
				message: ExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const isSameUser =
			Number((params as T)[parameterName]) === (user as UserAuthResponseDto).id;

		if (isSameUser) {
			throw new UserError({
				message: UserErrorMessage.FORBIDDEN_FOR_YOU,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		done();
	};

export { checkByParameterIfNotTheSameUser };
