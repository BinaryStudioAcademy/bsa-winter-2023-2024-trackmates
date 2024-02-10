import { FastifyRequest as BaseFastifyRequest } from "fastify";
import { UserEntity } from "~/modules/users/users.js";

declare module "fastify" {
	interface FastifyRequest {
		user?: UserEntity | null;
	}
}
