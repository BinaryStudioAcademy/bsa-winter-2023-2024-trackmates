import { type FastifyRequest as BaseFastifyRequest } from "fastify";

import { type UserSignUpResponseDto } from "~/modules/users/users.js";

declare module "fastify" {
	interface FastifyRequest extends BaseFastifyRequest {
		user?: UserSignUpResponseDto | null;
	}
}
