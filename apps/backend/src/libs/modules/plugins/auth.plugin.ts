import { type FastifyRequest } from "fastify";
import fp from "fastify-plugin";

import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode, HTTPHeader } from "~/libs/modules/http/http.js";
import { AuthError } from "~/modules/auth/libs/exceptions/exceptions.js";
import { type UserService } from "~/modules/users/users.js";

import { token as jwtToken } from "../token/token.js";
import { FastifyHook } from "./libs/enums/enums.js";
import { isWhiteRoute } from "./libs/helpers/helpers.js";

type Options = {
	services: {
		userService: UserService;
	};
};

const authorization = fp<Options>(
	(fastify, { services: { userService } }, done) => {
		fastify.decorateRequest("user", null);

		fastify.addHook(FastifyHook.ON_REQUEST, async (request: FastifyRequest) => {
			const authHeader = request.headers[HTTPHeader.AUTHORIZATION];

			if (isWhiteRoute(request.url)) {
				return;
			}

			if (!authHeader) {
				throw new AuthError(ExceptionMessage.NO_USER, HTTPCode.UNAUTHORIZED);
			}

			const [, token] = authHeader.split(" ");

			if (!token) {
				throw new AuthError(ExceptionMessage.NO_USER, HTTPCode.UNAUTHORIZED);
			}

			try {
				const { payload } = await jwtToken.verify(token);
				const { userId } = payload;
				const user = await userService.findById(userId);

				if (!user) {
					throw new AuthError(ExceptionMessage.NO_USER, HTTPCode.UNAUTHORIZED);
				}

				request.user = user;
			} catch {
				throw new AuthError(ExceptionMessage.NO_USER, HTTPCode.UNAUTHORIZED);
			}
		});

		done();
	},
);

export { authorization };
