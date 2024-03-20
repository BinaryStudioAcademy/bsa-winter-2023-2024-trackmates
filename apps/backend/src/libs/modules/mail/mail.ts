import { config } from "../config/config.js";
import { logger } from "../logger/logger.js";
import { Mail } from "./mail.module.js";

const mail = new Mail({
	config: {
		accessKeyId: config.ENV.AWS_S3.AWS_ACCESS_KEY_ID,
		region: config.ENV.AWS_S3.S3_REGION,
		secretAccessKey: config.ENV.AWS_S3.AWS_SECRET_ACCESS_KEY,
		sender: config.ENV.AWS_SES.SES_SENDER,
	},
	logger,
});

export { mail };
export { type Mail } from "./mail.module.js";
