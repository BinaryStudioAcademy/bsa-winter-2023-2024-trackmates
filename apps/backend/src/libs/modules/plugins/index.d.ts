import { FastifyRequest as BaseFastifyRequest } from "fastify";

declare module "fastify" {
	interface FastifyRequest extends BaseFastifyRequest {
		// TODO: Add User type
		user?: null;
	}
}
