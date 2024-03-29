import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

import { HTTPCode } from "../http/http.js";
import { type Logger } from "../logger/logger.js";
import { MailErrorMessage } from "./libs/enums/enums.js";
import { MailError } from "./libs/exceptions/exceptions.js";

type Constructor = {
	config: {
		accessKey: string;
		region: string;
		secretKey: string;
		sender: string;
	};
	logger: Logger;
};

class Mail {
	private logger: Logger;
	private sender: string;
	private sesClient: SESClient;

	public constructor({
		config: { accessKey, region, secretKey, sender },
		logger,
	}: Constructor) {
		this.logger = logger;
		this.sender = sender;

		this.sesClient = new SESClient({
			credentials: {
				accessKeyId: accessKey,
				secretAccessKey: secretKey,
			},
			region,
		});
	}

	public async send({
		email,
		subject,
		text,
	}: {
		email: string;
		subject: string;
		text: string;
	}): Promise<boolean> {
		const sendEmailCommand = new SendEmailCommand({
			Destination: {
				ToAddresses: [email],
			},
			Message: {
				Body: {
					Text: {
						Data: text,
					},
				},
				Subject: {
					Data: subject,
				},
			},
			Source: this.sender,
		});

		try {
			await this.sesClient.send(sendEmailCommand);
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
