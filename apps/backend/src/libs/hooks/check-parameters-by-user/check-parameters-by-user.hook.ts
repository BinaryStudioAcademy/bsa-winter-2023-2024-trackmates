import {
	type FastifyReply,
	type FastifyRequest,
	type HookHandlerDoneFunction,
} from "fastify";

import { ExceptionMessage, HTTPCode } from "~/libs/enums/enums.js";
import { type HTTPError } from "~/libs/exceptions/exceptions.js";
import { type UserAuthResponseDto, UserError } from "~/modules/users/users.js";

const checkParametersByUser =
	<T>(
		checker: (parameters: T, user: UserAuthResponseDto) => boolean,
		error: HTTPError,
	) =>
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

		if (!checker(params as T, user as UserAuthResponseDto)) {
			throw error;
		}

		done();
	};

export { checkParametersByUser };
