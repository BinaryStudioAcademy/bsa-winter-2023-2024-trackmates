import { type FastifyRequest } from "fastify";
import fp from "fastify-plugin";

import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode, HTTPError, HTTPHeader } from "~/libs/modules/http/http.js";
import { userService } from "~/modules/users/users.js";

import { token as jwtToken } from "../token/token.js";
import { FastifyHook } from "./libs/enums/enums.js";
import { isWhiteRoute } from "./libs/helpers/helpers.js";
import { type AuthPluginOptions } from "./libs/types/types.js";

const authorization = fp<AuthPluginOptions>(
	(fastify, { whiteRouteList }, done) => {
		fastify.decorateRequest("user", null);

		fastify.addHook(FastifyHook.ON_REQUEST, async (request: FastifyRequest) => {
			const authHeader = request.headers[HTTPHeader.AUTHORIZATION];

			if (isWhiteRoute(request.url, whiteRouteList)) {
				return;
			}

			if (!authHeader) {
				throw new HTTPError({
					message: ExceptionMessage.NO_USER,
					status: HTTPCode.UNAUTHORIZED,
				});
			}

			const [, token] = authHeader.split(" ");

			if (!token) {
				throw new HTTPError({
					message: ExceptionMessage.NO_USER,
					status: HTTPCode.UNAUTHORIZED,
				});
			}

			let userId: number;

			try {
				const { payload } = await jwtToken.verify(token);
				userId = payload.userId;
			} catch {
				throw new HTTPError({
					message: ExceptionMessage.NO_USER,
					status: HTTPCode.UNAUTHORIZED,
				});
			}

			const user = await userService.getAuthenticatedUser(userId);

			if (!user) {
				throw new HTTPError({
					message: ExceptionMessage.NO_USER,
					status: HTTPCode.UNAUTHORIZED,
				});
			}

			request.user = user;
		});

		done();
	},
);

export { authorization };
