import { Readable } from "node:stream";

type S3 = {
	upload(file: Readable, fileName: string): Promise<null | string>;
};

export { type S3 };
