import { config } from "../config/config.js";
import { logger } from "../logger/logger.js";
import { Mail } from "./mail.module.js";

const mail = new Mail({
	config: {
		accessKey: config.ENV.AWS.ACCESS_KEY,
		region: config.ENV.AWS.REGION,
		secretKey: config.ENV.AWS.SECRET_KEY,
		sender: config.ENV.AWS.SES_SENDER,
	},
	logger,
});

export { mail };
export { type Mail } from "./mail.module.js";
