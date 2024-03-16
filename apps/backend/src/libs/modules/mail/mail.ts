import { config } from "../config/config.js";
import { Mail } from "./mail.module.js";

const mail = new Mail({
	isLogged: config.ENV.MAIL.IS_LOGGED,
	isRequireTLS: config.ENV.MAIL.IS_REQUIRE_TLS,
	isSecure: config.ENV.MAIL.IS_SECURE,
	senderEmail: config.ENV.MAIL.USER_EMAIL,
	senderName: config.ENV.MAIL.USER_NAME,
	senderPassword: config.ENV.MAIL.USER_PASSWORD,
	service: config.ENV.MAIL.SERVICE,
});

export { mail };
export { type Mail } from "./mail.module.js";
