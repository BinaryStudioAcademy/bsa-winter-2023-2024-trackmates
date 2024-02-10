import { FastifyInstance, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import type { AuthPluginOptions } from "./libs/types/types.js";
import { AuthPluginErrorMessage } from "./libs/enums/enums.js";
import { HTTPCode, HTTPError, HTTPHeader } from "~/libs/modules/http/http.js";
import { userService } from "~/modules/users/users.js";

const plugin = async (fastify: FastifyInstance, opts: AuthPluginOptions) => {
	fastify.decorateRequest("user", null);

	fastify.addHook("preHandler", async (request: FastifyRequest, reply) => {
		const authHeader = request.headers[HTTPHeader.AUTHORIZATION];

		if (!authHeader) {
			throw new HTTPError({
				message: AuthPluginErrorMessage.NO_AUTH_HEADER,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		const token = authHeader.split(" ")[1];

		if (!token) {
			throw new HTTPError({
				message: AuthPluginErrorMessage.NO_JWT,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		let id: string;

		try {
			// TODO: verify JWT token
			id = "asldjflasf";
		} catch (err) {
			throw new HTTPError({
				message: AuthPluginErrorMessage.INVALID_JWT,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		// TODO: find user by id
		const user = await userService.find();

		if (!user) {
			throw new HTTPError({
				message: AuthPluginErrorMessage.NO_USER,
				status: HTTPCode.NOT_FOUND,
			});
		}

		// TODO: assign real user
		request.user = null;
	});
};

export const authorizationPlugin = fp(plugin, {
	name: "authorization",
});
