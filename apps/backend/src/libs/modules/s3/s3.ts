import { config } from "../config/config.js";
import { BaseS3 } from "./base-s3.module.js";

const s3 = new BaseS3(config);

export { s3 };
export { type S3 } from "./libs/types/types.js";
