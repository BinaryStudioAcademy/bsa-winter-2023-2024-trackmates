import { type FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { JWTExpired } from "jose/errors";

import { ExceptionMessage, FastifyHook } from "~/libs/enums/enums.js";
import { HTTPCode, HTTPHeader } from "~/libs/modules/http/http.js";
import { type Token } from "~/libs/modules/token/token.js";
import { AuthError } from "~/modules/auth/auth.js";
import { type UserService } from "~/modules/users/users.js";

import { checkIfWhiteRoute } from "./libs/helpers/helpers.js";

type Options = {
	services: {
		userService: UserService;
	};
	token: Token;
	whiteRoutes: string[];
};

const authorization = fp<Options>(
	(fastify, { services: { userService }, token, whiteRoutes }, done) => {
		fastify.decorateRequest("user", null);

		fastify.addHook(FastifyHook.ON_REQUEST, async (request: FastifyRequest) => {
			const authHeader = request.headers[HTTPHeader.AUTHORIZATION];

			if (checkIfWhiteRoute(request.url, whiteRoutes)) {
				return;
			}

			if (!authHeader) {
				throw new AuthError({
					message: ExceptionMessage.UNAUTHORIZED,
					status: HTTPCode.UNAUTHORIZED,
				});
			}

			const [, jwtToken] = authHeader.split(" ");

			if (!jwtToken) {
				throw new AuthError({
					message: ExceptionMessage.UNAUTHORIZED,
					status: HTTPCode.UNAUTHORIZED,
				});
			}

			try {
				const { payload } = await token.verify(jwtToken);
				const { userId } = payload;
				const user = await userService.findById(userId);

				if (!user) {
					throw new AuthError({
						message: ExceptionMessage.UNAUTHORIZED,
						status: HTTPCode.UNAUTHORIZED,
					});
				}

				request.user = user;
			} catch (error) {
				const isJwtExpiredError = error instanceof JWTExpired;

				throw new AuthError({
					message: isJwtExpiredError
						? ExceptionMessage.TOKEN_EXPIRED
						: ExceptionMessage.UNAUTHORIZED,
					status: HTTPCode.UNAUTHORIZED,
				});
			}
		});

		done();
	},
);

export { authorization };
