import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

import { HTTPCode } from "../http/http.js";
import { type Logger } from "../logger/logger.js";
import { MailErrorMessage } from "./libs/enums/enums.js";
import { MailError } from "./libs/exceptions/exceptions.js";

type Constructor = {
	config: {
		accessKeyId: string;
		region: string;
		secretAccessKey: string;
		sender: string;
	};
	logger: Logger;
};

class Mail {
	private logger: Logger;
	private sender: string;
	private sesClient: SESClient;

	public constructor({
		config: { accessKeyId, region, secretAccessKey, sender },
		logger,
	}: Constructor) {
		this.logger = logger;
		this.sender = sender;

		this.sesClient = new SESClient({
			credentials: {
				accessKeyId,
				secretAccessKey,
			},
			region,
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
		const parameters = {
			Destination: {
				ToAddresses: [to],
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
		};

		const sendEmainCommand = new SendEmailCommand(parameters);

		try {
			await this.sesClient.send(sendEmainCommand);
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
