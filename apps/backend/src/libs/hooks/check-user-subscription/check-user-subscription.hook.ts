import {
	type FastifyReply,
	type FastifyRequest,
	type HookHandlerDoneFunction,
} from "fastify";

import { ExceptionMessage, HTTPCode } from "~/libs/enums/enums.js";
import { SubscriptionError } from "~/modules/subscriptions/subscriptions.js";

const checkUserSubscription = (
	request: FastifyRequest,
	_reply: FastifyReply,
	done: HookHandlerDoneFunction,
): void => {
	const { user } = request;
	const hasUser = Boolean(user);

	if (!hasUser) {
		throw new SubscriptionError({
			message: ExceptionMessage.USER_NOT_FOUND,
			status: HTTPCode.NOT_FOUND,
		});
	}

	if (!user?.subscription) {
		throw new SubscriptionError({
			message: ExceptionMessage.NO_SUBSCRIPTION,
			status: HTTPCode.FORBIDDEN,
		});
	}

	done();
};

export { checkUserSubscription };
