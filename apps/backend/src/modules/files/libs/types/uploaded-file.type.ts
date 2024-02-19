import { ContentType } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type UploadedFile = {
	buffer: Buffer;
	contentType: ValueOf<typeof ContentType>;
	fileName: string;
};

export { type UploadedFile };
