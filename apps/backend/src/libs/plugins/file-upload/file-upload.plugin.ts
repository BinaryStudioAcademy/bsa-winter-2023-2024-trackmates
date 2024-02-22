import fastifyMultipart from "@fastify/multipart";
import fastifyPlugin from "fastify-plugin";

import {
	type ContentType,
	ExceptionMessage,
	FastifyHook,
} from "~/libs/enums/enums.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import { type ValueOf } from "~/libs/types/types.js";

type Options = {
	allowedExtensions: ValueOf<typeof ContentType>[];
	fileSize: number;
};

const fileUpload = fastifyPlugin<Options>(
	async (fastify, { allowedExtensions, fileSize }) => {
		fastify.decorate("uploadedFile", null);

		await fastify.register(fastifyMultipart, {
			limits: { fileSize },
			throwFileSizeLimit: false,
		});

		fastify.addHook(FastifyHook.PRE_HANDLER, async (request) => {
			if (!request.isMultipart()) {
				return;
			}

			const data = await request.file();

			if (
				data &&
				allowedExtensions.includes(data.mimetype as ValueOf<typeof ContentType>)
			) {
				const buffer = await data.toBuffer();

				if (data.file.truncated) {
					throw new HTTPError({
						message: ExceptionMessage.FILE_IS_TOO_LARGE,
						status: HTTPCode.BAD_REQUEST,
					});
				}

				request.uploadedFile = {
					buffer,
					contentType: data.mimetype as ValueOf<typeof ContentType>,
					fileName: data.filename,
				};
			}
		});
	},
);

export { fileUpload };
