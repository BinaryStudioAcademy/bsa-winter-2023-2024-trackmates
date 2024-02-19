import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

import { ExceptionMessage, HTTPCode } from "~/libs/enums/enums.js";
import { HTTPError } from "~/libs/exceptions/exceptions.js";

type Constructor = {
	accessKeyId: string;
	bucket: string;
	region: string;
	secretAccessKey: string;
};

class File {
	accessKeyId: string;
	bucket: string;
	region: string;
	secretAccessKey: string;

	constructor({ accessKeyId, bucket, region, secretAccessKey }: Constructor) {
		this.accessKeyId = accessKeyId;
		this.bucket = bucket;
		this.region = region;
		this.secretAccessKey = secretAccessKey;
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
