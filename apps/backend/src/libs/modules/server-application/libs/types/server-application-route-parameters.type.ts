import { type FastifyReply, type FastifyRequest } from "fastify";

import { type HTTPMethod } from "~/libs/modules/http/http.js";
import { type ValidationSchema } from "~/libs/types/types.js";

type ServerApplicationRouteParameters = {
	path: string;
	method: HTTPMethod;
	handler: (
		request: FastifyRequest,
		reply: FastifyReply,
	) => Promise<void> | void;
	validation?: {
		body?: ValidationSchema;
	};
};

export { type ServerApplicationRouteParameters };
