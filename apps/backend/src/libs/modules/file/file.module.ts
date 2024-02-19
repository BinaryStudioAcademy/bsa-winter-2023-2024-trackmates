import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

import { ExceptionMessage, HTTPCode } from "./libs/enums/enums.js";
import { HTTPError } from "./libs/exceptions/exceptions.js";

class File {
	accessKeyId: string;
	bucket: string;
	region: string;
	secretAccessKey: string;

	constructor(config: {
		accessKeyId: string;
		bucket: string;
		region: string;
		secretAccessKey: string;
	}) {
		this.accessKeyId = config.accessKeyId;
		this.bucket = config.bucket;
		this.region = config.region;
		this.secretAccessKey = config.secretAccessKey;
	}

	async upload(file: Buffer, fileName: string): Promise<string> {
		return await new Upload({
			client: new S3Client({
				credentials: {
					accessKeyId: this.accessKeyId,
					secretAccessKey: this.secretAccessKey,
				},
				region: this.region,
			}),
			params: {
				ACL: "public-read",
				Body: file,
				Bucket: this.bucket,
				Key: `${Date.now().toString()}-${fileName}`,
			},
		})
			.done()
			.then((result) => {
				if (result.Location) {
					return result.Location;
				}
				throw new HTTPError({
					message: ExceptionMessage.UNKNOWN_ERROR,
					status: HTTPCode.INTERNAL_SERVER_ERROR,
				});
			});
	}
}

export { File };
