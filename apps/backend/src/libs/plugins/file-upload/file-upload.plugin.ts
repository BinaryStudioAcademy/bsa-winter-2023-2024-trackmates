import fastifyMultipart from "@fastify/multipart";
import fastifyPlugin from "fastify-plugin";

import {
	ContentType,
	ExceptionMessage,
	FastifyHook,
} from "~/libs/enums/enums.js";
import { getSizeInMb } from "~/libs/helpers/helpers.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import { ValueOf } from "~/libs/types/types.js";

type Options = {
	allowedExtensions: ValueOf<typeof ContentType>[];
	fileSize: number;
};

const fileUpload = fastifyPlugin<Options>(
	async (fastify, { allowedExtensions, fileSize }) => {
		fastify.decorate("uploadedFile", null);

		await fastify.register(fastifyMultipart, { limits: { fileSize } });

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
				const maxFileSize = 5;
				if (buffer.byteLength > getSizeInMb(maxFileSize)) {
					throw new HTTPError({
						message: ExceptionMessage.FILE_IS_TO_LARGE,
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
