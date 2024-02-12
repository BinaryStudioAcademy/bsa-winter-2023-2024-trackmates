import { FastifyRequest as BaseFastifyRequest } from "fastify";

import { UserSignUpResponseDto } from "~/modules/users/libs/types/types.js";

declare module "fastify" {
	interface FastifyRequest extends BaseFastifyRequest {
		user?: UserSignUpResponseDto | null;
	}
}
