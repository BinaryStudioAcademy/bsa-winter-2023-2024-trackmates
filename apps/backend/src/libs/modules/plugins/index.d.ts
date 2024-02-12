import { FastifyRequest as BaseFastifyRequest } from "fastify";

import { UserGetAuthenticatedResponseDto } from "~/modules/users/libs/types/types.js";

declare module "fastify" {
	interface FastifyRequest extends BaseFastifyRequest {
		user?: UserGetAuthenticatedResponseDto | null;
	}
}
