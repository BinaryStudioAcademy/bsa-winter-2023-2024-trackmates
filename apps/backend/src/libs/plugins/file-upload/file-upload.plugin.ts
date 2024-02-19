import fastifyMultipart from "@fastify/multipart";
import fastifyPlugin from "fastify-plugin";

import { ContentType, FastifyHook } from "~/libs/enums/enums.js";
import { ValueOf } from "~/libs/types/types.js";

type Options = {
	allowedExtensions: ValueOf<typeof ContentType>[];
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

			if (
				data &&
				allowedExtensions.includes(data.mimetype as ValueOf<typeof ContentType>)
			) {
				const buffer = await data.toBuffer();
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
