import { type FastifyRequest as BaseFastifyRequest } from "fastify";

import { type UploadedFile } from "~/modules/files/files.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

declare module "fastify" {
	interface FastifyRequest extends BaseFastifyRequest {
		uploadedFile?: UploadedFile | null;
		user?: UserAuthResponseDto | null;
	}
}
