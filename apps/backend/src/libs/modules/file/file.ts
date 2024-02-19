import { config } from "../config/config.js";
import { File } from "./file.module.js";

const file = new File({
	accessKeyId: config.ENV.AWS_S3.AWS_ACCESS_KEY_ID,
	bucket: config.ENV.AWS_S3.S3_BUCKET,
	region: config.ENV.AWS_S3.S3_REGION,
	secretAccessKey: config.ENV.AWS_S3.AWS_SECRET_ACCESS_KEY,
});

export { file };
export { type File } from "./file.module.js";
