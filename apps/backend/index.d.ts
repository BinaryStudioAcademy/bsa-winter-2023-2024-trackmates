import { MultipartFile } from "@fastify/multipart";
import { type FastifyRequest as BaseFastifyRequest } from "fastify";

import { type UserAuthResponseDto } from "~/modules/users/users.js";

declare module "fastify" {
	interface FastifyRequest extends BaseFastifyRequest {
		uploadedFile?: MultipartFile | null;
		user?: UserAuthResponseDto | null;
	}
}
