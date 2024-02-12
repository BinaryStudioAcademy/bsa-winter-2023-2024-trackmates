import { FastifyInstance, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

import { HTTPCode, HTTPError, HTTPHeader } from "~/libs/modules/http/http.js";
import { userService } from "~/modules/users/users.js";

import type { AuthPluginOptions } from "./libs/types/types.js";

import { token as jwtToken } from "../token/token.js";
import { AuthPluginErrorMessage } from "./libs/enums/enums.js";
import { getApiEndpoint } from "./libs/helpers/helpers.js";

const plugin = (
	fastify: FastifyInstance,
	{ whiteRouteList }: AuthPluginOptions,
) => {
	fastify.decorateRequest("user", null);

	fastify.addHook("preHandler", async (request: FastifyRequest) => {
		const authHeader = request.headers[HTTPHeader.AUTHORIZATION];

		const apiEndpoint = getApiEndpoint(request.url);

		const isWhiteRoute = whiteRouteList.includes(apiEndpoint ?? "");

		if (isWhiteRoute) {
			return;
		}

		if (!authHeader) {
			throw new HTTPError({
				message: AuthPluginErrorMessage.NO_AUTH_HEADER,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		const [, token] = authHeader.split(" ");

		if (!token) {
			throw new HTTPError({
				message: AuthPluginErrorMessage.NO_JWT,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		let userId: number;

		try {
			({ userId } = await jwtToken.verifyToken(token));
		} catch {
			throw new HTTPError({
				message: AuthPluginErrorMessage.INVALID_JWT,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		const user = await userService.getAuthenticatedUser(userId);

		if (!user) {
			throw new HTTPError({
				message: AuthPluginErrorMessage.NO_USER,
				status: HTTPCode.NOT_FOUND,
			});
		}

		request.user = user;
	});
};

const authorizationPlugin = fp(plugin, {
	name: "authorization",
});

export { authorizationPlugin };
