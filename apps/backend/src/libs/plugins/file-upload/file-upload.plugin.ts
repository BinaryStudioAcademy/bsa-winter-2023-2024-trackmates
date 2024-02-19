import fastifyMultipart from "@fastify/multipart";
import fastifyPlugin from "fastify-plugin";

import { FastifyHook } from "~/libs/enums/enums.js";
import { FilesContentType } from "~/modules/files/files.js";

import { ValueOf } from "./libs/types/types.js";

type Options = {
	allowedExtensions: ValueOf<typeof FilesContentType>[];
};

const fileUpload = fastifyPlugin<Options>(
	async (fastify, { allowedExtensions }) => {
		fastify.decorate("uploadedFile", null);

		await fastify.register(fastifyMultipart);

		fastify.addHook(FastifyHook.PRE_HANDLER, async (request) => {
			if (!request.isMultipart()) {
				return;
			}

			const data = await request.file();

			if (data && data.mimetype in allowedExtensions) {
				const buffer = await data.toBuffer();
				request.uploadedFile = {
					buffer,
					contentType: data.mimetype as ValueOf<typeof FilesContentType>,
					fileName: data.filename,
				};
			}
		});
	},
);

export { fileUpload };
