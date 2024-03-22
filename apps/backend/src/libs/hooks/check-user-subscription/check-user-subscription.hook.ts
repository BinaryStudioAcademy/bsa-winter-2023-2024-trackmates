import {
	type FastifyReply,
	type FastifyRequest,
	type HookHandlerDoneFunction,
} from "fastify";

import { ExceptionMessage, HTTPCode } from "~/libs/enums/enums.js";
import { SubscriptionError } from "~/modules/subscriptions/subscriptions.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

const checkUserSubscription = (
	request: FastifyRequest,
	_reply: FastifyReply,
	done: HookHandlerDoneFunction,
): void => {
	const { user } = request;

	const hasSubscription = Boolean((user as UserAuthResponseDto).subscription);

	if (!hasSubscription) {
		throw new SubscriptionError({
			message: ExceptionMessage.NO_SUBSCRIPTION,
			status: HTTPCode.FORBIDDEN,
		});
	}

	done();
};

export { checkUserSubscription };
