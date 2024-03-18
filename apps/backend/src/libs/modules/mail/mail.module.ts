import nodemailer, { type Transporter } from "nodemailer";

import { HTTPCode } from "../http/http.js";
import { type Logger } from "../logger/logger.js";
import { MailErrorMessage } from "./libs/enums/enums.js";
import { MailError } from "./libs/exceptions/exceptions.js";

type Constructor = {
	config: {
		isLogged: boolean;
		isRequireTLS: boolean;
		isSecure: boolean;
		senderEmail: string;
		senderName: string;
		senderPassword: string;
		service: string;
	};
	logger: Logger;
};

class Mail {
	private logger: Logger;
	private senderEmail: string;
	private senderName: string;

	private transporter: Transporter;

	public constructor({
		config: {
			isLogged,
			isRequireTLS,
			isSecure,
			senderEmail,
			senderName,
			senderPassword,
			service,
		},
		logger,
	}: Constructor) {
		this.logger = logger;
		this.senderEmail = senderEmail;
		this.senderName = senderName;

		this.transporter = nodemailer.createTransport({
			auth: {
				pass: senderPassword,
				user: senderEmail,
			},
			logger: isLogged,
			requireTLS: isRequireTLS,
			secure: isSecure,
			service,
		});
	}

	public async send({
		email: to,
		subject,
		text,
	}: {
		email: string;
		subject: string;
		text: string;
	}): Promise<boolean> {
		const from = `${this.senderName} <${this.senderEmail}>`;

		try {
			await this.transporter.sendMail({ from, subject, text, to });
		} catch (error) {
			this.logger.error(
				`${MailErrorMessage.SENDING_MAIL_FAILED} ${(error as Error).message}`,
			);

			throw new MailError({
				message: MailErrorMessage.SENDING_MAIL_FAILED,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}

		return true;
	}
}

export { Mail };
