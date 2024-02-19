import { type ValueOf } from "shared";

import { FilesContentType } from "../enums/enums.js";

type UploadedFile = {
	buffer: Buffer;
	contentType: ValueOf<typeof FilesContentType>;
	fileName: string;
};

export { type UploadedFile };
