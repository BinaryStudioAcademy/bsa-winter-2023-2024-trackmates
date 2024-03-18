import {
	type FastifyReply,
	type FastifyRequest,
	type HookHandlerDoneFunction,
} from "fastify";

import { type HTTPMethod } from "~/libs/modules/http/http.js";
import { type ValidationSchema } from "~/libs/types/types.js";

import { type APIHandler } from "./api-handler.type.js";

type ControllerRouteParameters = {
	handler: APIHandler;
	method: HTTPMethod;
	path: string;
	preHandler?: (
		request: FastifyRequest,
		reply: FastifyReply,
		done: HookHandlerDoneFunction,
	) => Promise<void> | void;
	validation?: {
		body?: ValidationSchema;
		params?: ValidationSchema;
		query?: ValidationSchema;
	};
};

export { type ControllerRouteParameters };
