import fastifyMultipart from "@fastify/multipart";
import fastifyPlugin from "fastify-plugin";

import {
	type ContentType,
	ExceptionMessage,
	FastifyHook,
} from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type ValueOf } from "~/libs/types/types.js";
import { FileError } from "~/modules/files/files.js";

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
			const buffer = await data?.toBuffer();

			const isFileCorrect =
				data &&
				buffer &&
				allowedExtensions.includes(
					data.mimetype as ValueOf<typeof ContentType>,
				);

			if (!isFileCorrect) {
				throw new FileError({
					message: ExceptionMessage.NO_FILE_PRESENTED,
					status: HTTPCode.BAD_REQUEST,
				});
			}

			if (data.file.truncated) {
				throw new FileError({
					message: ExceptionMessage.FILE_IS_TOO_LARGE,
					status: HTTPCode.BAD_REQUEST,
				});
			}

			request.uploadedFile = {
				buffer,
				contentType: data.mimetype as ValueOf<typeof ContentType>,
				fileName: data.filename,
			};
		});
	},
);

export { fileUpload };
