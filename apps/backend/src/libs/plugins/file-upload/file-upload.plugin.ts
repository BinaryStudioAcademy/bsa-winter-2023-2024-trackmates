import fastifyMultipart from "@fastify/multipart";
import fastifyPlugin from "fastify-plugin";

import { FastifyHook } from "~/libs/enums/enums.js";

const fileUpload = fastifyPlugin(async (fastify) => {
	fastify.decorate("uploadedFile", null);

	await fastify.register(fastifyMultipart);

	fastify.addHook(FastifyHook.PRE_HANDLER, async (request) => {
		if (request.isMultipart()) {
			const data = await request.file();

			if (data && data.mimetype.includes("image")) {
				const buffer = await data.toBuffer();
				request.uploadedFile = {
					buffer: buffer,
					contentType: data.mimetype,
					fileName: data.filename,
				};
			}
		}
	});
});

export { fileUpload };
