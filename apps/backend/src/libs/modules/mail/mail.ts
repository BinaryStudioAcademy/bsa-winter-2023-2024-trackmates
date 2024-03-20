import { config } from "../config/config.js";
import { logger } from "../logger/logger.js";
import { Mail } from "./mail.module.js";

const mail = new Mail({
	config: {
		accessKeyId: config.ENV.AWS.AWS_ACCESS_KEY_ID,
		region: config.ENV.AWS.S3_REGION,
		secretAccessKey: config.ENV.AWS.AWS_SECRET_ACCESS_KEY,
		sender: config.ENV.AWS.SES_SENDER,
	},
	logger,
});

export { mail };
export { type Mail } from "./mail.module.js";
