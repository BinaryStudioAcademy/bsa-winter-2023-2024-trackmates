import {
	type FastifyReply,
	type FastifyRequest,
	type HookHandlerDoneFunction,
} from "fastify";

const combineHooks =
	(
		hooks: ((
			request: FastifyRequest,
			_reply: FastifyReply,
			done: HookHandlerDoneFunction,
		) => void)[],
	) =>
	(
		request: FastifyRequest,
		_reply: FastifyReply,
		done: HookHandlerDoneFunction,
	): void => {
		for (const hook of hooks) {
			hook(request, _reply, done);
		}
	};

export { combineHooks };
