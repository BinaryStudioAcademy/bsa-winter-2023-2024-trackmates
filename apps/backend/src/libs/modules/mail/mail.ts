import { config } from "../config/config.js";
import { Mail } from "./mail.module.js";

const mail = new Mail({
	logger: config.ENV.MAIL.LOGGER,
	requireTLS: config.ENV.MAIL.REQUIRE_TLS,
	secure: config.ENV.MAIL.SECURE,
	senderEmail: config.ENV.MAIL.USER_EMAIL,
	senderName: config.ENV.MAIL.USER_NAME,
	senderPassword: config.ENV.MAIL.USER_PASSWORD,
	service: config.ENV.MAIL.SERVICE,
});

export { mail };
export { type Mail } from "./mail.module.js";
